"use client";
import React from "react";
import {
  Alert,
  AspectRatio,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/joy";
import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { setSuccess } from "@/app/redux/notificationSlice";

function SuccessAlert() {
  const [progress, setProgress] = useState(0);

  const alertRef = useRef(null);
  const success = useSelector((state) => state.notification.success);
  const dispatch = useDispatch();

  useEffect(() => {
    const duration = 5000; // Duración total en milisegundos para llegar de 0 a 100
    const steps = 100; // Número de pasos para llegar de 0 a 100
    const increment = duration / steps; // Incremento de progreso por paso
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;
      const progressValue = Math.min(1, elapsedTime / duration) * 100;

      if (success) {
        setProgress(progressValue);
        if (progressValue < 100) {
          requestAnimationFrame(animate);
        } else {
          dispatch(setSuccess(false));
          setProgress(0);
          startTime = null;
          requestAnimationFrame(animate);
        }
      }
    };

    requestAnimationFrame(animate);

    return () => {
      setProgress(0);
      startTime = null;
    }

  }, [success]);

  return (
    <div className="absolute right-5 bottom-5 w-[400px] h-[98px]">
      {success && (
        <Alert
          ref={alertRef}
          size="lg"
          color="success"
          variant="solid"
          invertedColors
          startDecorator={
            <AspectRatio
              variant="solid"
              ratio="1"
              sx={{
                minWidth: 40,
                borderRadius: "50%",
                boxShadow: "0 2px 12px 0 rgb(0 0 0/0.2)",
              }}
            >
              <div>
                <Check fontSize="xl2" />
              </div>
            </AspectRatio>
          }
          endDecorator={
            <IconButton
              variant="plain"
              sx={{
                "--IconButton-size": "32px",
                transform: "translate(0.5rem, -0.5rem)",
              }}
              onClick={() => dispatch(setSuccess(false))}
            >
              <Close />
            </IconButton>
          }
          sx={{
            alignItems: "flex-start",
            overflow: "hidden",
            width: "400px",
            display: "flex",
          }}
        >
          <div>
            <Typography level="title-lg">
              ¡Creación de usuario exitosa!
            </Typography>
            <Typography level="body-sm">
              Se ha creado el usuario de manera satisfactoria
            </Typography>
          </div>
          <LinearProgress
            determinate
            color="success"
            value={progress}
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 0,
            }}
          />
        </Alert>
      )}
    </div>
  );
}

export default SuccessAlert;
