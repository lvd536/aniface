import { apiRoutes } from "@/consts/apiRoutes";
import { CatalogResponse } from "@/types/api.types";
import axios from "axios";

export async function getCatalog() {
    try {
        const response: CatalogResponse = await axios
            .get(apiRoutes.catalog)
            .then((resp) => resp.data);
        return response;
    } catch (error) {
        console.error("Error fetching catalog:", error);
        throw error;
    }
}
