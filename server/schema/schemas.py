def individual_serial(alert) -> dict:
    return {
        "id": str(alert["_id"]),
        "user": str(alert["user"]),
        "alertName": alert["alertName"],
        "product": alert["product"],
        "productType": alert["productType"],
        "details": alert["details"],
        "alertType": alert["alertType"],
        "threshold": alert["threshold"],
    }


def list_serial(alerts) -> list:
    return[individual_serial(alert) for alert in alerts]
