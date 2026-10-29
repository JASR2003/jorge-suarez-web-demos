from pathlib import Path
from reportlab.lib.colors import HexColor, white
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.platypus import Paragraph, Table, TableStyle
from reportlab.pdfgen import canvas

OUT = Path(__file__).resolve().parents[1] / "output" / "pdf" / "orbit-launch-kit.pdf"
OUT.parent.mkdir(parents=True, exist_ok=True)

W, H = A4
BG = HexColor("#080B18")
PANEL = HexColor("#11172A")
LINE = HexColor("#29304A")
VIOLET = HexColor("#8F7CFF")
CYAN = HexColor("#5FE4FF")
TEXT = HexColor("#F5F7FF")
MUTED = HexColor("#AAB2CA")
DIM = HexColor("#727C99")

title = ParagraphStyle("title", fontName="Helvetica-Bold", fontSize=28, leading=30, textColor=TEXT)
h1 = ParagraphStyle("h1", fontName="Helvetica-Bold", fontSize=22, leading=25, textColor=TEXT)
h2 = ParagraphStyle("h2", fontName="Helvetica-Bold", fontSize=13, leading=16, textColor=CYAN)
body = ParagraphStyle("body", fontName="Helvetica", fontSize=9.5, leading=15, textColor=MUTED)
small = ParagraphStyle("small", fontName="Helvetica", fontSize=7.5, leading=11, textColor=DIM)
center = ParagraphStyle("center", parent=body, alignment=TA_CENTER)


def background(c, page, section):
    c.setFillColor(BG)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setFillColor(VIOLET)
    c.circle(W - 16 * mm, H - 14 * mm, 1.8 * mm, fill=1, stroke=0)
    c.setFillColor(CYAN)
    c.circle(W - 10 * mm, H - 14 * mm, 1.8 * mm, fill=1, stroke=0)
    c.setFont("Helvetica-Bold", 8)
    c.setFillColor(TEXT)
    c.drawString(16 * mm, H - 17 * mm, "ORBIT / LAUNCH KIT")
    c.setFont("Helvetica", 7)
    c.setFillColor(DIM)
    c.drawRightString(W - 16 * mm, 12 * mm, f"{page:02d}  /  {section.upper()}")
    c.setStrokeColor(LINE)
    c.line(16 * mm, H - 23 * mm, W - 16 * mm, H - 23 * mm)


def para(c, text, style, x, y, width):
    p = Paragraph(text, style)
    _, height = p.wrap(width, H)
    p.drawOn(c, x, y - height)
    return y - height


def pill(c, text, x, y, fill=PANEL, color=CYAN):
    tw = stringWidth(text, "Helvetica-Bold", 7)
    c.setFillColor(fill)
    c.roundRect(x, y - 5 * mm, tw + 8 * mm, 7 * mm, 3.5 * mm, fill=1, stroke=0)
    c.setFillColor(color)
    c.setFont("Helvetica-Bold", 7)
    c.drawString(x + 4 * mm, y - 2.5 * mm, text)


def panel(c, x, y, w, h, number, heading, copy):
    c.setFillColor(PANEL)
    c.setStrokeColor(LINE)
    c.roundRect(x, y - h, w, h, 4 * mm, fill=1, stroke=1)
    c.setFillColor(VIOLET)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(x + 7 * mm, y - 9 * mm, number)
    para(c, heading, h2, x + 7 * mm, y - 17 * mm, w - 14 * mm)
    para(c, copy, body, x + 7 * mm, y - 29 * mm, w - 14 * mm)


def checklist(c, items, x, y, width):
    for item in items:
        c.setFillColor(CYAN)
        c.circle(x + 2 * mm, y - 2 * mm, 1.5 * mm, fill=1, stroke=0)
        y = para(c, item, body, x + 8 * mm, y + 1 * mm, width - 8 * mm) - 4 * mm
    return y


c = canvas.Canvas(str(OUT), pagesize=A4)
c.setTitle("Orbit Launch Kit - Guia practica para lanzar proyectos digitales")
c.setAuthor("Orbit Studio - Demo")

# Cover
c.setFillColor(BG); c.rect(0, 0, W, H, fill=1, stroke=0)
c.setFillColor(VIOLET); c.circle(W * .78, H * .77, 52 * mm, fill=1, stroke=0)
c.setFillColor(CYAN); c.circle(W * .88, H * .72, 22 * mm, fill=1, stroke=0)
c.setFillColor(BG); c.circle(W * .78, H * .77, 38 * mm, fill=1, stroke=0)
pill(c, "GUÍA + PLANTILLAS / EDICIÓN 01", 18 * mm, H - 28 * mm)
y = para(c, "Lanza tu idea.<br/>Sin perderte<br/>en el proceso.", title, 18 * mm, H - 92 * mm, 120 * mm)
para(c, "Un sistema breve para convertir una idea en una propuesta clara, validarla y preparar un lanzamiento realista en cuatro semanas.", body, 18 * mm, y - 10 * mm, 105 * mm)
c.setFont("Helvetica-Bold", 10); c.setFillColor(TEXT); c.drawString(18 * mm, 25 * mm, "ORBIT LAUNCH KIT")
c.setFont("Helvetica", 8); c.setFillColor(MUTED); c.drawString(18 * mm, 19 * mm, "Producto digital demostrativo / 2026")
c.showPage()

# Welcome
background(c, 2, "Introducción")
pill(c, "ANTES DE EMPEZAR", 16 * mm, H - 34 * mm)
y = para(c, "No necesitas otra lista infinita. Necesitas decisiones.", h1, 16 * mm, H - 58 * mm, 150 * mm)
y = para(c, "Orbit está diseñado para proyectos pequeños: una guía, un servicio, un recurso digital o una primera versión de producto. No promete eliminar la incertidumbre; te ayuda a convertirla en preguntas que sí puedes responder.", body, 16 * mm, y - 8 * mm, 165 * mm)
panel(c, 16 * mm, y - 16 * mm, 52 * mm, 58 * mm, "01", "Claridad", "Define para quién construyes, qué problema resuelves y qué cambio prometes.")
panel(c, 72 * mm, y - 16 * mm, 52 * mm, 58 * mm, "02", "Evidencia", "Valida con conversaciones, señales y pruebas pequeñas antes de producir de más.")
panel(c, 128 * mm, y - 16 * mm, 52 * mm, 58 * mm, "03", "Movimiento", "Diseña un plan semanal que termine en una entrega visible, no en más preparación.")
para(c, "Cómo usar este kit", h2, 16 * mm, 74 * mm, 160 * mm)
checklist(c, ["Trabaja una sección por día y escribe respuestas concretas.", "Sustituye opiniones por observaciones y conversaciones.", "Termina cada semana con una decisión: continuar, cambiar o detener."], 16 * mm, 61 * mm, 165 * mm)
c.showPage()

# Four-week map
background(c, 3, "Mapa")
para(c, "El mapa de cuatro semanas", h1, 16 * mm, H - 40 * mm, 150 * mm)
para(c, "Cada semana produce un resultado que puede enseñarse, discutirse y mejorarse.", body, 16 * mm, H - 57 * mm, 150 * mm)
weeks = [
    ("SEMANA 01", "Enfocar", "Audiencia, problema y propuesta de valor.", CYAN),
    ("SEMANA 02", "Validar", "Entrevistas, objeciones y prueba mínima.", VIOLET),
    ("SEMANA 03", "Construir", "Alcance, contenido y experiencia esencial.", CYAN),
    ("SEMANA 04", "Lanzar", "Mensaje, canales, calendario y métricas.", VIOLET),
]
yy = H - 78 * mm
for label, heading, copy, accent in weeks:
    c.setFillColor(PANEL); c.setStrokeColor(LINE); c.roundRect(16 * mm, yy - 39 * mm, 165 * mm, 34 * mm, 4 * mm, fill=1, stroke=1)
    c.setFillColor(accent); c.rect(16 * mm, yy - 39 * mm, 3 * mm, 34 * mm, fill=1, stroke=0)
    c.setFont("Helvetica-Bold", 7); c.setFillColor(accent); c.drawString(25 * mm, yy - 15 * mm, label)
    para(c, heading, h2, 63 * mm, yy - 11 * mm, 45 * mm)
    para(c, copy, body, 108 * mm, yy - 10 * mm, 63 * mm)
    yy -= 42 * mm
c.showPage()

# Audience
background(c, 4, "Semana 01")
pill(c, "PLANTILLA 01", 16 * mm, H - 34 * mm)
para(c, "Una persona concreta, no un mercado abstracto.", h1, 16 * mm, H - 58 * mm, 165 * mm)
para(c, "Describe a la persona por su situación, comportamiento y urgencia. Evita definirla solo por edad o profesión.", body, 16 * mm, H - 78 * mm, 165 * mm)
rows = [["Pregunta", "Tu respuesta"], ["¿Qué intenta conseguir ahora?", ""], ["¿Qué le impide avanzar?", ""], ["¿Qué ha probado antes?", ""], ["¿Por qué actuaría esta semana?", ""], ["¿Qué resultado consideraría valioso?", ""]]
t = Table(rows, colWidths=[66 * mm, 99 * mm], rowHeights=[11 * mm] + [24 * mm] * 5)
t.setStyle(TableStyle([("BACKGROUND", (0,0), (-1,0), VIOLET), ("TEXTCOLOR", (0,0), (-1,0), white), ("BACKGROUND", (0,1), (-1,-1), PANEL), ("TEXTCOLOR", (0,1), (-1,-1), MUTED), ("GRID", (0,0), (-1,-1), .6, LINE), ("FONT", (0,0), (-1,0), "Helvetica-Bold", 8), ("FONT", (0,1), (-1,-1), "Helvetica", 8), ("VALIGN", (0,0), (-1,-1), "MIDDLE"), ("LEFTPADDING", (0,0), (-1,-1), 8)]))
t.wrapOn(c, 165 * mm, H); t.drawOn(c, 16 * mm, 52 * mm)
c.showPage()

# Value proposition
background(c, 5, "Semana 01")
pill(c, "PLANTILLA 02", 16 * mm, H - 34 * mm)
para(c, "Construye una promesa verificable.", h1, 16 * mm, H - 58 * mm, 155 * mm)
para(c, "Completa la frase sin usar palabras como innovador, integral o revolucionario.", body, 16 * mm, H - 77 * mm, 160 * mm)
panel(c, 16 * mm, H - 96 * mm, 165 * mm, 48 * mm, "01", "FÓRMULA", "Ayudo a [persona] a conseguir [resultado] sin [fricción principal], mediante [mecanismo concreto].")
panel(c, 16 * mm, H - 153 * mm, 165 * mm, 48 * mm, "02", "EJEMPLO", "Ayudo a profesionales independientes a publicar una primera oferta clara sin construir un sistema complejo, mediante un sprint guiado de cuatro semanas.")
para(c, "Prueba de claridad", h2, 16 * mm, 79 * mm, 160 * mm)
checklist(c, ["¿Una persona puede repetir la promesa después de leerla una vez?", "¿El resultado puede observarse o medirse?", "¿El mecanismo explica por qué tu propuesta es distinta?"], 16 * mm, 65 * mm, 165 * mm)
c.showPage()

# Interviews
background(c, 6, "Semana 02")
pill(c, "GUION DE ENTREVISTA", 16 * mm, H - 34 * mm)
para(c, "Escucha experiencias, no cumplidos.", h1, 16 * mm, H - 58 * mm, 155 * mm)
questions = [
    ("01", "Cuéntame la última vez que intentaste resolverlo."),
    ("02", "¿Qué parte resultó más lenta o frustrante?"),
    ("03", "¿Qué solución usas hoy y qué no funciona bien?"),
    ("04", "¿Qué ocurre si no lo resuelves este mes?"),
    ("05", "¿Qué tendría que incluir una solución para que la probaras?"),
]
yy = H - 82 * mm
for number, question in questions:
    c.setStrokeColor(LINE); c.line(16 * mm, yy, 181 * mm, yy)
    c.setFont("Helvetica-Bold", 8); c.setFillColor(VIOLET); c.drawString(16 * mm, yy - 11 * mm, number)
    para(c, question, body, 33 * mm, yy - 6 * mm, 145 * mm)
    yy -= 34 * mm
para(c, "Registra palabras exactas. Tu página de venta debería sonar como tus clientes, no como una presentación corporativa.", small, 16 * mm, 43 * mm, 165 * mm)
c.showPage()

# Experiment
background(c, 7, "Semana 02")
pill(c, "PLANTILLA 03", 16 * mm, H - 34 * mm)
para(c, "La prueba mínima", h1, 16 * mm, H - 58 * mm, 155 * mm)
para(c, "No construyas el producto completo para descubrir si alguien lo necesita. Diseña la prueba más pequeña que reduzca una incertidumbre importante.", body, 16 * mm, H - 77 * mm, 165 * mm)
items = [("Hipótesis", "Creemos que..."), ("Señal", "Sabremos que es cierto si..."), ("Prueba", "Durante 7 días haremos..."), ("Umbral", "Continuaremos si conseguimos..."), ("Decisión", "Si no ocurre, cambiaremos...")]
yy = H - 100 * mm
for idx, (heading, prompt) in enumerate(items, 1):
    panel(c, 16 * mm, yy, 165 * mm, 28 * mm, f"0{idx}", heading, prompt)
    yy -= 33 * mm
c.showPage()

# Scope
background(c, 8, "Semana 03")
pill(c, "ALCANCE", 16 * mm, H - 34 * mm)
para(c, "Construye el recorrido esencial.", h1, 16 * mm, H - 58 * mm, 155 * mm)
para(c, "Un MVP no es un producto mediocre. Es la versión más pequeña que permite completar el resultado prometido.", body, 16 * mm, H - 77 * mm, 165 * mm)
columns = [
    ("DEBE TENER", ["Entrega el resultado principal", "Reduce el mayor riesgo", "Puede probarse de principio a fin"]),
    ("PUEDE ESPERAR", ["Personalización avanzada", "Automatizaciones", "Integraciones secundarias"]),
    ("NO INCLUIR", ["Funciones sin evidencia", "Detalles puramente decorativos", "Trabajo imposible de mantener"]),
]
for i, (heading, entries) in enumerate(columns):
    x = 16 * mm + i * 56 * mm
    c.setFillColor(PANEL); c.setStrokeColor(LINE); c.roundRect(x, H - 190 * mm, 52 * mm, 102 * mm, 4 * mm, fill=1, stroke=1)
    para(c, heading, h2, x + 6 * mm, H - 101 * mm, 40 * mm)
    checklist(c, entries, x + 6 * mm, H - 124 * mm, 40 * mm)
para(c, "Pregunta de corte: si elimino esta función, ¿la persona todavía puede conseguir el resultado?", small, 16 * mm, 52 * mm, 165 * mm)
c.showPage()

# Message
background(c, 9, "Semana 04")
pill(c, "MENSAJE DE LANZAMIENTO", 16 * mm, H - 34 * mm)
para(c, "Explica el cambio, no la lista de funciones.", h1, 16 * mm, H - 58 * mm, 165 * mm)
blocks = [
    ("01", "Situación", "Nombra el momento en el que la persona se reconoce."),
    ("02", "Tensión", "Explica por qué su solución actual no es suficiente."),
    ("03", "Resultado", "Muestra el cambio concreto que puede conseguir."),
    ("04", "Mecanismo", "Resume cómo funciona tu producto o servicio."),
    ("05", "Prueba", "Incluye evidencia, demostración o caso real."),
    ("06", "Acción", "Propón un siguiente paso único y comprensible."),
]
yy = H - 82 * mm
for i, (n, heading, copy) in enumerate(blocks):
    x = 16 * mm if i % 2 == 0 else 101 * mm
    if i % 2 == 0 and i: yy -= 51 * mm
    panel(c, x, yy, 80 * mm, 44 * mm, n, heading, copy)
c.showPage()

# Launch calendar
background(c, 10, "Semana 04")
pill(c, "CALENDARIO", 16 * mm, H - 34 * mm)
para(c, "Siete días para salir al mundo.", h1, 16 * mm, H - 58 * mm, 155 * mm)
days = ["Preparar la página y prueba", "Invitar a primeros usuarios", "Publicar historia del problema", "Mostrar el producto en acción", "Responder objeciones", "Abrir la oferta", "Revisar datos y aprendizajes"]
yy = H - 82 * mm
for i, item in enumerate(days, 1):
    c.setFillColor(PANEL); c.setStrokeColor(LINE); c.roundRect(16 * mm, yy - 22 * mm, 165 * mm, 18 * mm, 3 * mm, fill=1, stroke=1)
    c.setFillColor(VIOLET if i % 2 else CYAN); c.setFont("Helvetica-Bold", 8); c.drawString(22 * mm, yy - 15 * mm, f"DÍA {i}")
    para(c, item, body, 55 * mm, yy - 10 * mm, 115 * mm)
    yy -= 25 * mm
c.showPage()

# Metrics
background(c, 11, "Medición")
pill(c, "TABLERO MÍNIMO", 16 * mm, H - 34 * mm)
para(c, "Mide para decidir, no para decorar reportes.", h1, 16 * mm, H - 58 * mm, 165 * mm)
metrics = [
    ("ATENCIÓN", "Visitas cualificadas", "¿Llegó la audiencia correcta?"),
    ("INTERÉS", "Respuesta o registro", "¿La promesa produjo curiosidad?"),
    ("ACCIÓN", "Compra o prueba", "¿La propuesta fue suficientemente valiosa?"),
    ("USO", "Resultado completado", "¿El producto cumplió su trabajo?"),
]
yy = H - 86 * mm
for index, (stage, metric, question) in enumerate(metrics, 1):
    panel(c, 16 * mm, yy, 165 * mm, 38 * mm, f"0{index} / {stage}", metric, question)
    yy -= 45 * mm
para(c, "Elige una métrica principal por etapa y una fecha para revisarla. Más números no significan más claridad.", small, 16 * mm, 45 * mm, 165 * mm)
c.showPage()

# Closing
background(c, 12, "Cierre")
c.setFillColor(VIOLET); c.circle(W / 2, H * .67, 42 * mm, fill=1, stroke=0)
c.setFillColor(BG); c.circle(W / 2, H * .67, 31 * mm, fill=1, stroke=0)
para(c, "Tu siguiente paso<br/>debe caber en hoy.", title, 31 * mm, H * .49, 148 * mm)
para(c, "No esperes a sentir que todo está listo. Elige una conversación, una prueba o una entrega pequeña y ponla en el calendario.", center, 35 * mm, H * .35, 140 * mm)
pill(c, "IDEA  >  EVIDENCIA  >  ENTREGA  >  APRENDIZAJE", 39 * mm, H * .22, PANEL, CYAN)
c.setFont("Helvetica", 8); c.setFillColor(DIM); c.drawCentredString(W / 2, 20 * mm, "Orbit Launch Kit / producto digital demostrativo / jorge-suarez-web-demos")
c.save()
print(OUT)
