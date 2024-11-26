import * as config from "./src/utils/config";
import { app } from "./src/app";

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
});