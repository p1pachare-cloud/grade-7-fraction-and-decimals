import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

def create_document():
    doc = docx.Document()

    # Page setup - Margins
    for section in doc.sections:
        section.top_margin = Inches(1)
        section.bottom_margin = Inches(1)
        section.left_margin = Inches(1)
        section.right_margin = Inches(1)

    # Styling colors
    PRIMARY_COLOR = RGBColor(45, 27, 105)     # #2d1b69 Deep Purple
    SECONDARY_COLOR = RGBColor(255, 193, 7)   # #ffc107 Gold
    TEXT_DARK = RGBColor(30, 30, 60)         # #1e1e3c
    BG_LIGHT_HEX = "F0F4F8"
    BORDER_HEX = "D0D7DE"

    # Set Base Normal Style
    style_normal = doc.styles['Normal']
    font = style_normal.font
    font.name = 'Calibri'
    font.size = Pt(11)
    font.color.rgb = TEXT_DARK

    def set_cell_background(cell, fill_hex):
        tcPr = cell._tc.get_or_add_tcPr()
        shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
        tcPr.append(shd)

    def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
        tcPr = cell._tc.get_or_add_tcPr()
        tcMar = parse_xml(f'<w:tcMar {nsdecls("w")}><w:top w:w="{top}" w:type="dxa"/><w:bottom w:w="{bottom}" w:type="dxa"/><w:left w:w="{left}" w:type="dxa"/><w:right w:w="{right}" w:type="dxa"/></w:tcMar>')
        tcPr.append(tcMar)

    def add_title(text):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        run = p.add_run(text)
        run.font.name = 'Calibri'
        run.font.size = Pt(26)
        run.font.bold = True
        run.font.color.rgb = PRIMARY_COLOR
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.space_before = Pt(0)

    def add_subtitle(text):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        run = p.add_run(text)
        run.font.name = 'Calibri'
        run.font.size = Pt(14)
        run.font.italic = True
        run.font.color.rgb = RGBColor(100, 100, 140)
        p.paragraph_format.space_after = Pt(24)

    def add_heading_1(text):
        p = doc.add_paragraph()
        run = p.add_run(text)
        run.font.name = 'Calibri'
        run.font.size = Pt(18)
        run.font.bold = True
        run.font.color.rgb = PRIMARY_COLOR
        p.paragraph_format.space_before = Pt(18)
        p.paragraph_format.space_after = Pt(8)
        p.paragraph_format.keep_with_next = True

    def add_heading_2(text):
        p = doc.add_paragraph()
        run = p.add_run(text)
        run.font.name = 'Calibri'
        run.font.size = Pt(14)
        run.font.bold = True
        run.font.color.rgb = RGBColor(60, 40, 120)
        p.paragraph_format.space_before = Pt(14)
        p.paragraph_format.space_after = Pt(6)
        p.paragraph_format.keep_with_next = True

    def add_heading_3(text):
        p = doc.add_paragraph()
        run = p.add_run(text)
        run.font.name = 'Calibri'
        run.font.size = Pt(12)
        run.font.bold = True
        run.font.color.rgb = RGBColor(40, 40, 80)
        p.paragraph_format.space_before = Pt(10)
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.keep_with_next = True

    def add_body_p(text, bold_prefix="", italic=False):
        p = doc.add_paragraph()
        if bold_prefix:
            r_bold = p.add_run(bold_prefix)
            r_bold.font.bold = True
        run = p.add_run(text)
        run.font.italic = italic
        p.paragraph_format.space_after = Pt(6)
        p.paragraph_format.line_spacing = 1.15
        return p

    def add_bullet(text, bold_prefix=""):
        p = doc.add_paragraph(style='List Bullet')
        if bold_prefix:
            r_bold = p.add_run(bold_prefix)
            r_bold.font.bold = True
        p.add_run(text)
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.line_spacing = 1.15
        return p

    def add_callout(text, title="NOTE"):
        tbl = doc.add_table(rows=1, cols=1)
        tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
        cell = tbl.cell(0, 0)
        set_cell_background(cell, "F8F9FA")
        set_cell_margins(cell, top=140, bottom=140, left=200, right=200)

        # Left border thickness
        tcPr = cell._tc.get_or_add_tcPr()
        borders = parse_xml(f'<w:tcBorders {nsdecls("w")}><w:left w:val="single" w:sz="24" w:space="0" w:color="2D1B69"/><w:top w:val="none"/><w:right w:val="none"/><w:bottom w:val="none"/></w:tcBorders>')
        tcPr.append(borders)

        p = cell.paragraphs[0]
        r_title = p.add_run(f"{title}: ")
        r_title.font.bold = True
        r_title.font.color.rgb = PRIMARY_COLOR
        r_text = p.add_run(text)
        r_text.font.italic = True
        p.paragraph_format.space_after = Pt(0)
        doc.add_paragraph().paragraph_format.space_after = Pt(6)

    # -----------------------------
    # DOCUMENT CONTENT GENERATION
    # -----------------------------

    # Title Banner
    add_title("Fractions and Decimals | Grade 7 Math")
    add_subtitle("Product Requirements Document (PRD) & Technical Requirements Document (TRD)\nIntellia SG • Global Mathematics Curriculum Series")

    # ==========================================
    # PART 1: PRD
    # ==========================================
    add_heading_1("PART 1: PRODUCT REQUIREMENTS DOCUMENT (PRD)")

    add_heading_2("1. Executive Summary & Product Vision")
    add_body_p("This document defines the comprehensive product requirements for 'Fractions & Decimals Expedition', an interactive, gamified, simulation-based web application module designed for Grade 7 learners (ages 12–13). Building on basic fraction and decimal literacy from primary grades, this module equips middle-school students with mastery over fraction-decimal conversions, rational number comparisons, all arithmetic operations (+, −, ×, ÷), distinguishing terminating vs. recurring decimals, precision rounding/significant figures, and multi-step real-world problem solving.")
    add_body_p("The module strictly adheres to Intellia's proven 6-phase learner journey (INTRO → WONDER → STORY → SIMULATE → PLAY → REFLECT) and adopts a sophisticated, mature aesthetic suitable for teenagers.")

    add_callout("Grade 7 Target Tone: Designed specifically for 12–13 year olds, avoiding childish visuals. Uses crisp futuristic glassmorphism, sleek data displays, and real-world engineering contexts.", "PEDAGOGICAL DIRECTIVE")

    add_heading_2("2. Global Curriculum Cross-Mapping")
    add_body_p("The module provides 100% curriculum coverage across major international education frameworks:")

    headers = ["Curriculum Standard", "Code / Reference", "Learning Objective Focus"]
    data = [
        ["Common Core (US)", "7.NS.A.2, 7.NS.A.3", "Convert rational numbers to decimals using long division; know terminating vs. recurring; apply operations."],
        ["Singapore Math", "Sec 1 G3 / Pri 6", "Fractions and decimals operations, recurring decimal notation, rounding to 3 sig figs, real-world context."],
        ["UK National Curriculum", "KS3 Mathematics Year 7-8", "Order positive/negative fractions & decimals, convert recurring decimals, rounding to decimal places & sig figs."],
        ["Australian Curriculum", "AC9M7N03, AC9M7N04", "Compare and order rational numbers, multiply/divide fractions & decimals, solve percentage/financial problems."],
        ["CBSE / ICSE (India)", "Class 7 Chapter 2", "Fractions and Decimals: multiplication and division of decimal numbers, word problems, fraction conversions."]
    ]

    table = doc.add_table(rows=len(data)+1, cols=3)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    for idx, h in enumerate(headers):
        cell = table.cell(0, idx)
        set_cell_background(cell, "2D1B69")
        p = cell.paragraphs[0]
        r = p.add_run(h)
        r.font.bold = True
        r.font.color.rgb = RGBColor(255, 255, 255)
        p.alignment = WD_ALIGN_PARAGRAPH.LEFT

    for r_idx, row in enumerate(data):
        for c_idx, val in enumerate(row):
            cell = table.cell(r_idx + 1, c_idx)
            if r_idx % 2 == 1:
                set_cell_background(cell, BG_LIGHT_HEX)
            p = cell.paragraphs[0]
            p.add_run(val)
            p.paragraph_format.space_after = Pt(2)

    doc.add_paragraph().paragraph_format.space_after = Pt(6)

    add_heading_2("3. Pedagogical Concrete → Pictorial → Abstract (CPA) Progression")
    add_bullet("Concrete Stage: Interactive number line splitters, decimal place-value sliders, grid shaded regions, and visual fraction bars.", "1. ")
    add_bullet("Pictorial Stage: Dual-scale number line representations comparing 1/3 to 0.333..., area model representations of fraction multiplication, and decimal placement diagrams.", "2. ")
    add_bullet("Abstract Stage: Long division conversion algorithm, recurring decimal bar notation (0.3̄), fraction division via reciprocal multiplication, and rounding to specified significant figures.", "3. ")

    add_heading_2("4. Story-World Themes (Age 12–13 Tone)")
    add_body_p("Three mature candidate story themes designed for middle-school engagement:")
    add_bullet("Global Cyber-Grid Architects: Junior system engineers optimizing network bandwith, server fraction allocation, and decimal signal latency across major world hubs (Tokyo, London, NYC, Nairobi, Rio).", "Theme A (Selected): ")
    add_bullet("Interstellar Navigation Guild: Flight navigators calculating thrust ratios, fuel fractions, and orbital trajectory decimals for space exploration craft.", "Theme B: ")
    add_bullet("Global Eco-Engineering League: Environmental scientists balancing renewable energy fractions, water flow decimals, and carbon metric calculations.", "Theme C: ")

    add_heading_2("5. The 6-Phase Learner Journey")
    add_bullet("INTRO: System briefing & global engineering dashboard overview.", "Phase 1 - ")
    add_bullet("WONDER: Hook — 'Why does 1/3 equal 0.333... forever, but 1/4 ends at 0.25?' Interactive decimal splitter.", "Phase 2 - ")
    add_bullet("STORY: Global Cyber-Grid Architects narrative panels (Aisha in Dubai, Liam in London, Yuki in Tokyo).", "Phase 3 - ")
    add_bullet("SIMULATE: 3 interactive stations (Station A: Fraction-Decimal Converter & Terminating/Recurring; Station B: Operations & Reciprocal Matrix; Station C: Rounding & Sig Fig Calibrator).", "Phase 4 - ")
    add_bullet("PLAY: IntelliPlay™ 10-World Cyber League with procedural questions, streak multipliers, and Boss Milestones.", "Phase 5 - ")
    add_bullet("REFLECT: Engineering log reflection, confidence rating, and global architect certificate.", "Phase 6 - ")

    # ==========================================
    # PART 2: TRD
    # ==========================================
    add_heading_1("PART 2: TECHNICAL REQUIREMENTS DOCUMENT (TRD)")

    add_heading_2("1. Technology Stack & Architecture")
    add_bullet("Vite + React 18/19 (TypeScript / JSX)", "UI Framework: ")
    add_bullet("Vanilla CSS Modules + Tailwind Utility Classes (Dark glassmorphism theme)", "Styling: ")
    add_bullet("Lucide React + Inline SVG Custom Visualizers", "Icons & SVGs: ")
    add_bullet("Framer Motion + CSS keyframes for 60fps micro-animations", "Animations: ")
    add_bullet("React useReducer + Context API + 24hr LocalStorage persistence", "State Management: ")
    add_bullet("Three-tier hybrid engine (Pre-generated ElevenLabs .mp3 assets → Dynamic ElevenLabs API → Web Speech API fallback)", "Audio Pipeline: ")

    add_heading_2("2. Reference Repository Alignment")
    add_body_p("The project structure strictly mirrors github.com/dsamyak/equal and equal-tau.vercel.app for UI/UX glassmorphism aesthetics, while using state management and audio queue patterns from github.com/dsamyak/numberbound.")

    add_heading_2("3. Three-Tier Audio Pipeline Specification")
    add_bullet("Tier 1 (Static Assets): Pre-generated ElevenLabs MP3 files stored in public/assets/audio/ and indexed via src/utils/audioMap.ts.", "• ")
    add_bullet("Tier 2 (Dynamic ElevenLabs): On-the-fly API call to ElevenLabs endpoint using voice 'Alice' (ID: Xb7hH8MSUJpSbSDYk0k2) when VITE_ELEVENLABS_API_KEY is present.", "• ")
    add_bullet("Tier 3 (Web Speech API Fallback): Browser-native SpeechSynthesis fallback ensuring 100% audio availability across all offline and restricted environments.", "• ")

    add_heading_2("4. Procedural Question Generation Engine")
    add_body_p("To ensure 0% question repetition across retries, the math engine dynamically parameterizes question templates:")
    add_callout("Example Engine Logic: Generates fraction a/b where a ∈ [1, 15], b ∈ [2, 20]. Computes exact decimal d = a/b. Determines terminating (b prime factors only 2, 5) vs recurring. Dynamically generates distractor options using common student misconceptions.", "PROCEDURAL MATH ENGINE")

    add_heading_2("5. Vercel Deployment Configuration")
    add_body_p("Configured for single-command Vercel serverless deployment with SPA rewrites:")
    add_bullet("verce.json build config with rewrite rule source: '/(.*)' -> destination: '/index.html'", "Routing: ")
    add_bullet("VITE_ELEVENLABS_API_KEY injected via environment variables.", "Environment: ")

    # Save document
    doc.save("Grade7_Fractions_and_Decimals_PRD_TRD.docx")
    print("Successfully generated Grade7_Fractions_and_Decimals_PRD_TRD.docx")

if __name__ == '__main__':
    create_document()
