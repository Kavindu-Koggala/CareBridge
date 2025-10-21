from fastapi import APIRouter
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from db import get_db_connection
import datetime

router = APIRouter()

@router.get("/sleep-analytics")
def get_sleep_analytics():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            SELECT 
                DATE(timestamp) as date,
                COUNT(*) as total_predictions,
                SUM(CASE WHEN prediction = 'Closed' THEN 1 ELSE 0 END) as closed_count,
                SUM(CASE WHEN prediction = 'Open' THEN 1 ELSE 0 END) as open_count,
                SUM(CASE WHEN sleep_confirmed = 1 THEN 1 ELSE 0 END) as sleep_confirmed_count
            FROM eye_state_records
            GROUP BY DATE(timestamp)
            ORDER BY DATE(timestamp) DESC
            LIMIT 30
        """)

        results = cursor.fetchall()
        cursor.close()
        conn.close()

        # Debug print for development
        print("[DEBUG] Raw analytics results:", results)

        # Use jsonable_encoder to handle date serialization automatically
        json_compatible_results = jsonable_encoder(
            {"analytics": results},
            custom_encoder={datetime.date: lambda v: v.isoformat()}
        )

        return JSONResponse(content=json_compatible_results)

    except Exception as e:
        print(f"[Analytics Error] {e}")
        return JSONResponse(status_code=500, content={"detail": "Failed to fetch analytics data"})
