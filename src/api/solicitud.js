export async function getAllSolicitud(url) {
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

export async function deleteSolicitud(url) {
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (response.ok) {
      console.log("Solicitud eliminada con éxito");
    } else {
      console.log("Problema al eliminar la solicitud:", response.status);
      throw new Error("Problema al eliminar la solicitud");
    }
  } catch (error) {
    console.error("Problema en el servicio:", error.message);
    throw new Error("Problema en el servicio");
  }
}

export async function insertSolicitud(url, solicitudData) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(solicitudData),
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
