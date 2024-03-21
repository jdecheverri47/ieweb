import {
  Modal,
  FormControl,
  Input,
  Button,
  Stack,
  DialogTitle,
  DialogContent,
  Checkbox,
  ModalDialog,
  FormLabel,
  Select,
  Option,
} from "@mui/joy";
import { useEffect, useState } from "react";
import { Transition } from "react-transition-group";
import { db } from "../../utils/firebase";
import { setDoc, doc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setSuccess } from "@/app/redux/notificationSlice";
import { yellow } from "@mui/material/colors";

function MyModal({ open, setOpen }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    department: "",
    rol: "",
    status: false,
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/ieid-8d946.appspot.com/o/images%2F2024-03-14T10%3A05%3A01.2958932024-03-14%2010%3A05%3A01.173488..jpg?alt=media&token=fed3baca-1b24-4e7a-aad8-fd4da882f992",
  });

  const handleInputChange = (e) => {
    const { name, type } = e.target;
    const newValue = type === "checkbox" ? e.target.checked : e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSelectChange = (e, newValue) => {
    setFormData((prevData) => ({
      ...prevData,
      rol: newValue,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(
        "https://us-central1-ieid-8d946.cloudfunctions.net/api/api/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setData(data);
        const userId = data.uid;

        const userDocRef = doc(db, "users", userId);

        await setDoc(userDocRef, {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          department: formData.department,
          status: formData.status,
          rol: formData.rol,
          userId: userId,
          imageUrl: formData.imageUrl,
        });
        dispatch(setSuccess(true));
      } else {
        console.error("Error al crear el usuario", response.statusText);
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      setLoading(false);
    }
    setOpen(false);
    setLoading(false);

    setFormData({
      name: "",
      email: "",
      password: "",
      phone: "",
      department: "",
      status: false,
    });
  };

  useEffect(() => {
    if (open) {
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        department: "",
        rol: "",
        status: false,
      });
    }
  }, [open]);

  return (
    <Transition in={open} timeout={500}>
      {(state) => (
        <Modal
          keepMounted
          open={!["exited", "exiting"].includes(state)}
          onClose={() => setOpen(false)}
          slotProps={{
            backdrop: {
              sx: {
                opacity: 0,
                backdropFilter: "none",
                transition: `opacity 400ms, backdrop-filter 400ms`,
                ...{
                  entering: { opacity: 1, backdropFilter: "blur(8px)" },
                  entered: { opacity: 1, backdropFilter: "blur(8px)" },
                }[state],
              },
            },
          }}
          sx={{
            visibility: state === "exited" ? "hidden" : "visible",
          }}
        >
          <ModalDialog
            className="w-[400px]"
            sx={{
              opacity: 0,
              transition: `opacity 300ms`,
              ...{
                entering: { opacity: 1 },
                entered: { opacity: 1 },
              }[state],
            }}
          >
            <DialogTitle>Crear nuevo usuario</DialogTitle>
            <DialogContent>
              Completa el formulario para añadir un usuario.
            </DialogContent>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    value={formData.email ?? ""}
                    onChange={handleInputChange}
                    required
                    className="max-w-[400px]"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Contraseña</FormLabel>
                  <Input
                    required
                    type="password"
                    name="password"
                    className="max-w-[400px]"
                    value={formData.password ?? ""}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    autoFocus
                    required
                    name="name"
                    className="max-w-[400px]"
                    value={formData.name ?? ""}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Celular</FormLabel>
                  <Input
                    required
                    name="phone"
                    className="max-w-[400px]"
                    value={formData.phone ?? ""}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Departamento</FormLabel>
                  <Input
                    required
                    name="department"
                    className="max-w-[400px]"
                    value={formData.department ?? ""}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl className="max-w-full">
                  <FormLabel>Rol</FormLabel>
                  <Select
                    name="rol"
                    onChange={handleSelectChange}
                    placeholder="Selecciona un rol"
                    value={formData.rol ?? ""}
                  >
                    <Option value="user">User</Option>
                    <Option value="admin">Admin</Option>
                  </Select>
                </FormControl>
                <FormControl className="max-w-fit">
                  <Checkbox
                    label="Activo"
                    color="warning"
                    className="mt-2"
                    name="status"
                    checked={formData.status}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <div className="w-full flex items-center justify-end">
                  <Button
                    disabled={loading}
                    type="submit"
                    className="w-[140px]"
                    sx={{
                      color: "black",
                      backgroundColor: "#FFE100 !important",
                      transition: "all .3s ease-in-out",
                      "&:hover": {
                        backgroundColor: "#FFE1009b !important",
                      },
                    }}
                    loading={loading}
                  >
                    Crear usuario
                  </Button>
                </div>
              </Stack>
            </form>
          </ModalDialog>
        </Modal>
      )}
    </Transition>
  );
}

export default MyModal;
