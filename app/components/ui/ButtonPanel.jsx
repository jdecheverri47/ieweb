import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Button, Input } from "@mui/joy";
import MyModal from "./MyModal";
import { useState, useEffect } from "react";
import { Add } from "@mui/icons-material";

function ButtonPanel({
  nextPage,
  prevPage,
  currentPage,
  indexOfLastRow,
  originalData,
  data,
  setData,
  handleInputChange,
  search,
}) {
  const [open, setOpen] = useState(false);

  function searchData(arr, input) {
    input = input.toLowerCase();
    const results = arr.filter((obj) => {
      const lowercase = obj.name.toLowerCase();
      return lowercase.includes(input);
    });
    return results;
  }

  const filteredData = searchData(originalData, search);

  useEffect(() => {
    setData(filteredData);
  }, [search, setData]);

  return (
    <div className="pl-[2rem] my-3 flex gap-4 -z-20">
      <Input
        className="w-[200px]"
        placeholder="Buscar usuario"
        value={search}
        onChange={handleInputChange}
        sx={{ position: "unset !important"}}
      />
     
      <div>
        <Button
          variant="outlined"
          color="neutral"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon className="w-5" />
        </Button>
        <Button
          variant="outlined"
          color="neutral"
          onClick={nextPage}
          disabled={indexOfLastRow >= data.length}
          className="ml-1"
        >
          <ChevronRightIcon className="w-5" />
        </Button>
      </div>
      <Button
        endDecorator={<Add />}
        variant="solid"
        sx={{
          color: "black",
          fontWeight: "medium",
          fontFamily: "'__Poppins_6d1a03', '__Poppins_Fallback_6d1a03'",
          backgroundColor: "#FFE100 !important",
          transition: "all .3s ease-in-out",
          "&:hover": {
            backgroundColor: "#FFE1009b !important",
          },
        }}
        onClick={() => setOpen(true)}
      >
        Crear usuario
      </Button>
      <MyModal open={open} setOpen={setOpen} />
    </div>
  );
}

export default ButtonPanel;
