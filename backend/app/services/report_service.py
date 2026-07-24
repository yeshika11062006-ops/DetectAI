from io import BytesIO

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
)

from reportlab.lib.styles import getSampleStyleSheet


def generate_report(filename: str, analysis: dict):

    buffer = BytesIO()

    doc = SimpleDocTemplate(buffer)

    styles = getSampleStyleSheet()

    story = []

    story.append(
        Paragraph(
            "<b>DetectAI Investigation Report</b>",
            styles["Title"],
        )
    )

    story.append(Spacer(1, 20))

    story.append(
        Paragraph(
            f"<b>Evidence:</b> {filename}",
            styles["BodyText"],
        )
    )

    story.append(Spacer(1, 15))

    story.append(
        Paragraph(
            "<b>AI Summary</b>",
            styles["Heading2"],
        )
    )

    story.append(
        Paragraph(
            analysis.get("summary", ""),
            styles["BodyText"],
        )
    )

    story.append(Spacer(1, 15))

    sections = [
        ("People", "people"),
        ("Organizations", "organizations"),
        ("Locations", "locations"),
        ("Dates", "dates"),
        ("Keywords", "keywords"),
        ("Insights", "insights"),
    ]

    for title, key in sections:

        story.append(
            Paragraph(
                f"<b>{title}</b>",
                styles["Heading2"],
            )
        )

        values = analysis.get(key, [])

        if values:
            for item in values:
                story.append(
                    Paragraph(
                        f"• {item}",
                        styles["BodyText"],
                    )
                )
        else:
            story.append(
                Paragraph(
                    "None",
                    styles["BodyText"],
                )
            )

        story.append(Spacer(1, 10))

    doc.build(story)

    buffer.seek(0)

    return buffer