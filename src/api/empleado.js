export async function getEmpleado(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return response.json();
    } else {
      console.log("Problema en la consulta");
    }
  } catch (error) {
    console.log("Problema en el servicio");
  }
}

export async function insertEmpleado(url, empleadoData) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(empleadoData),
    });
    if (response.ok) {
      return response.json();
    } else {
      console.log("Problema en la inserción:", response.status);
      throw new Error("Problema en la inserción");
    }
  } catch (error) {
    console.error("Problema en el servicio:", error.message);
    throw new Error("Problema en el servicio");
  }
}
