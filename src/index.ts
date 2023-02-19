import express from "express";
import mongoose from "mongoose";
import productRouter from "./routers/productRouter";
import userRouter from "./routers/userRouter";
import fileUpload from "express-fileupload";

const app = express();
const PORT = 5000;

const MONGO_URI =
  "mongodb+srv://lenderisfree:<Buenos#1>@cluster0.etzxk7t.mongodb.net/?retryWrites=true&w=majority";

app.use(express.json());
app.use(fileUpload());
app.use(express.static("static"));
const startApp = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(MONGO_URI);
    console.log("Successefully connected to db");
    app.listen(PORT, () => {
      console.log(`Server started on PORT: ${PORT}`);
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

startApp();

const appRouter = express.Router();

appRouter.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send("ok");
});

// appRouter.get("*", (req: express.Request, res: express.Response) => {
//   res.status(404).send("Not found");
// });

app.use(appRouter);
app.use("/api", productRouter);
app.use("/user", userRouter);
