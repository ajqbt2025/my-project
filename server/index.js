const express = require("express");
const app = express();

const {cloudinaryConnect} = require("./config/cloudinary");
const authRoutes = require("./Routes/authRoute")
const fullDetailsRoute = require("./Routes/fullDetailsRoute")
const userRoute = require("./Routes/user")
const paymentRoute = require("./Routes/PaymentRoute")
const connectDB = require("./config/database");
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const CeriedRoute = require("./Routes/CertifiedRoute")
const AdminRoute = require("./Routes/Adminroute")
dotenv.config()
const PORT = process.env.PORT || 4000

connectDB().then(() => {

app.use(express.json())
app.use(cookieParser())
// app.use()
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);
cloudinaryConnect()

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/detailed",fullDetailsRoute)
app.use("/api/v1/user",userRoute)
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/certified", CeriedRoute);
app.use("/api/v1/admin",AdminRoute)


app.get("/",(req,res) =>{
    return res.json({
        success:true,
        message:"Your server is up and running...."
    })
})

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})
});