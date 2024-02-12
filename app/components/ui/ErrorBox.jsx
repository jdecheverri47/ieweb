import { Alert, Typography, Box, Button } from "@mui/joy"
import { Warning } from "@mui/icons-material"

function ErrorBox({setErrorDialog, errorDialog}) {
  return (
    <Alert
        variant="soft"
        color="danger"
        invertedColors
        startDecorator={
            <Warning  />
        }
        sx={{ alignItems: 'flex-center', gap: '1rem', marginTop: '1rem'}}
      >
        <Box sx={{ flex: 1 }}>
          <Typography level="title-sm">Datos inválidos</Typography>
          <Typography level="body-sm">
            Porfavor verifica que la información sea correcta.
          </Typography>
        </Box>
      </Alert>
  )
}

export default ErrorBox