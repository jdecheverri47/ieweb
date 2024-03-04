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
} from "@mui/joy";
import { useState, useEffect } from "react";
import { Transition } from "react-transition-group";
import { db } from "../../utils/firebase";
import { updateDoc, collection, doc } from "firebase/firestore";
import { set } from "react-hook-form";

function EditModal({ openUpdate, setOpenUpdate, selectedRow }) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: selectedRow.name,
    email: selectedRow.email,
    phone: selectedRow.phone,
    department: selectedRow.department,
    status: selectedRow.status || false,
  });

  const handleInputChange = (e) => {
    const newData = { ...formData };

    if (e.target.name === "status") {
      newData[e.target.name] = e.target.checked;
      setFormData(newData);
      return;
    }

    newData[e.target.name] = e.target.value;
    setFormData(newData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const uid = selectedRow.userId;
    setLoading(true);

    try {
      console.log(formData);
      const response = await fetch(`https://us-central1-ieid-8d946.cloudfunctions.net/api/api/user/${uid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error updating user");
      }

      const docRef = doc(db, "users", uid);
      await updateDoc(docRef, formData);
      
    } catch (error) {
      console.error("Error updating document: ", error);
      setLoading(false);
    }

    setOpenUpdate(false);
    setLoading(false);
  };
  
  useEffect(() => {
    setFormData(selectedRow);
  }, [selectedRow]);

  return (
    <Transition in={openUpdate} timeout={500}>
      {(state) => (
        <Modal
          keepMounted
          open={!["exited", "exiting"].includes(state)}
          onClose={() => setOpenUpdate(false)}
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
            <DialogTitle>Actualizar usuario</DialogTitle>
            <DialogContent>
              Completa el formulario para actualizar un usuario.
            </DialogContent>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="max-w-[400px]"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    autoFocus
                    required
                    name="name"
                    className="max-w-[400px]"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Celular</FormLabel>
                  <Input
                    required
                    type="number"
                    name="phone"
                    className="max-w-[400px]"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Departamento</FormLabel>
                  <Input
                    required
                    name="department"
                    className="max-w-[400px]"
                    value={formData.department}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl className="max-w-fit">
                  <Checkbox
                    label="Activo"
                    className="mt-2"
                    name="status"
                    checked={formData.status}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <div className="w-full flex items-center justify-end">
                  <Button
                    disabled={loading}
                    loading={loading}
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
                  >
                    Actualizar
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

export default EditModal;
