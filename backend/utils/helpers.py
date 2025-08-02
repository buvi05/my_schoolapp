def calculate_progress(total_minutes):
    """
    Australian benchmark: 60 minutes/day = 420 minutes/week for children.
    """
    if total_minutes >= 420:
        return "Green (On Track)"
    elif total_minutes >= 300:
        return "Yellow (Needs Attention)"
    else:
        return "Red (Below Target)"
