from django.urls import path
from .views import *

urlpatterns = [
    path("create/", create_payment),
    path("history/", payment_history),
    path("stats/", dashboard_stats),
    path(
    "update/<int:payment_id>/",
    update_payment_status
    ),
    path("export/excel/", export_excel),
    path("export/pdf/", export_pdf),
   
]