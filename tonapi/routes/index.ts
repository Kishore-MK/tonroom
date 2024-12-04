var express = require('express');
var router = express.Router();
router.use(express.json());
/* GET home page. */
var prisma=require('../lib/prisma')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// POST: Create a RequestQueue
router.post("/requestQueue", async (req, res) => {
  try {
    const { topic, creator } = req.body;

    if (!topic || !creator) {
      return res.status(400).json({ error: "Topic and Creator are required" });
    }

    const newRequest = await prisma.requestQueue.create({
      data: {
        topic,
        creator,
      }})
    console.log("hey");
    return res.status(200)
      
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST: Create a ChatRoom
router.post("/chatRooms", async (req, res) => {
  try {
    const { topic, creator, participant, PaymentStatus } = req.body;

    if (!topic || !creator || !participant || !PaymentStatus) {
      return res
        .status(400)
        .json({ error: "All fields (topic, creator, participant, PaymentStatus) are required" });
    }

    const newChatRoom = await prisma.chatRooms.create({
      data: {
        topic,
        creator,
        participant,
        PaymentStatus,
      },
    });

    // Schedule deletion after 120 minutes
    setTimeout(async () => {
      await prisma.chatRooms.delete({
        where: { id: newChatRoom.id },
      });
      console.log(`ChatRoom ${newChatRoom.id} deleted after 120 mins.`);
    }, 120 * 60 * 1000);

    res.status(201).json(newChatRoom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET: Fetch all RequestQueues
router.get("/requestQueue", async (req, res) => {
  try {console.log("loooooooggg");
    const requestQueues = await prisma.requestQueue.findMany();
    
    
    res.status(200).json(requestQueues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET: Fetch all ChatRooms
router.get("/chatRooms", async (req, res) => {
  try {
    const chatRooms = await prisma.chatRooms.findMany();
    res.status(200).json(chatRooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE: Manually delete a RequestQueue
router.delete("/requestQueue/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.requestQueue.delete({
      where: { id },
    });

    res.status(200).json({ message: "RequestQueue deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE: Manually delete a ChatRoom
router.delete("/chatRooms/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.chatRooms.delete({
      where: { id },
    });

    res.status(200).json({ message: "ChatRoom deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
