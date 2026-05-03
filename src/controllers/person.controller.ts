import { Request, Response } from "express";
import { ApiResponseHelper } from "../utils/api_helper.util"
import { HttpException } from "../exceptions/http_exception";
import {  Person } from "../types";
import z from "zod";
import { createPersonOTD } from "../dtos/person.dots";


// remove one properties

let persons: Person[] = [
  { id: 1, name: "sandesh", age: 28 },
  { id: 2, name: "rabin", age: 21 },
  { id: 30, name: "amrit", age: 49 },
];

export class PersonController {
  getAllPersons = (req: Request, res: Response) => {

    try {
      const arr: any = {}
      arr.ref.add(10)

      if (!arr.ref) {
        return ApiResponseHelper.success<Person[]>(
          res, persons, "Persons fetched successfully", {
          limit: 200,
          page: 1,
          total: 200
        })
      }
    } catch (err: HttpException | any) {
      return ApiResponseHelper.error(
        res, "failed to fetch persons", err.status ?? 500
      )

    }
  };

  getPersonById = (req: Request, res: Response) => {
    const { id } = req.params;
    const result = persons.find(item => item.id === parseInt(id as string));
    if (!result) return res.status(404).json({ message: "Person not found!!" });
    return res.status(200).json({ data: result });
  };

  createPerson = (req: Request, res: Response) => {
    const parsedData = createPersonOTD.safeParse(req.body)

    if (!parsedData.success) {
      return ApiResponseHelper.error(res, z.prettifyError(parsedData.error), 400)
    }


    const { name, age } = parsedData.data

    const newPerson: Person = {
      id: persons.length > 0 ? Math.max(...persons.map((p) => p.id)) + 1 : 1,
      name,
      age
    };
    persons.push(newPerson);
    return res.status(201).json({ data: newPerson });
  };


  updatePerson = (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, age } = req.body;

    const personIndex = persons.findIndex(item => item.id === parseInt(id as string));
    if (personIndex === -1) {
      return res.status(404).json({ message: "Not found!!" });
    }

    persons[personIndex] = { id: parseInt(id as string), name, age };
    return res.status(200).json({ data: persons[personIndex] });
  };

  deletePerson = (req: Request, res: Response) => {
    const { id } = req.params;
    const personIndex = persons.findIndex(item => item.id === parseInt(id as string));

    if (personIndex === -1) {
      return res.status(404).json({ message: "Not found!!" });
    }

    const deleted = persons.splice(personIndex, 1);
    return res.status(200).json({ data: deleted[0] });
  };
}
