from datetime import datetime


def get_formatted_date_from_str(dt_str, format_schema="%Y-%m-%d:%H:%M:%S"):
    return datetime.strptime(dt_str, format_schema)
