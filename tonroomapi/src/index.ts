import express from "express";
import cors from "cors";
import prisma from "./lib/prisma";
const app= express()
const port= process.env.PORT||8080;

app.use(express.json());
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/request-queue", async (req, res) => {
  try {
    const requestQueue = await prisma.requestQueue.findMany();
    res.json(requestQueue);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

app.post("/request-queue", async (req, res) => {
  const { topic, creator } = req.body;

  try {
    const newRequest = await prisma.requestQueue.create({
      data: { topic, creator },
    });
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get("/chat-rooms", async (req, res) => {
  try {
    const chatRooms = await prisma.chatRooms.findMany();
    res.json(chatRooms);
  } catch (error) {
    res.status(500).json({ error: error});
  }
});

app.post("/chat-rooms", async (req, res) => {
  const { topic, creator, participant, PaymentStatus } = req.body;

  try {
    const newChatRoom = await prisma.chatRooms.create({
      data: { topic, creator, participant, PaymentStatus },
    });
    res.status(201).json(newChatRoom);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});




app.listen(port,()=>{
    console.log(`Server running on port: ${port}`);
    
})


