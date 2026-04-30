import { Router } from "express";
import { PersonController } from "../controllers/person.controller";

const router: Router = Router();
const personController = new PersonController();

router.get("/", personController.getAllPersons);
router.post("/create/person/new", personController.createPerson);
router.get("/:id", personController.getPersonById);
router.put("/:id", personController.updatePerson);
router.delete("/:id", personController.deletePerson);

export default router;
