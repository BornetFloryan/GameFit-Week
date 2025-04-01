const express = require("express");
const teamsController = require("../controllers/teams.controller");

var router = express.Router();

router.get("/",teamsController.getTeams);
/**
 * @swagger
 * /teams:
 *   get:
 *     summary: Récupérer tous les équipes
 *     tags:
 *      - Équipes
 *     responses:
 *       200:
 *         description: Succès
 *       500:
 *         description: Erreur serveur
 */

router.post("/add",teamsController.addTeam);
/**
 * @swagger
 * /teams/add:
 *   post:
 *     summary: Ajouter une nouvelle équipe
 *     tags:
 *      - Équipes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Team Liquid"
 *             description: "Une équipe de légende"
 *     responses:
 *       201:
 *         description: Équipe créée avec succès.
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Erreur lors de la création de l'équipe.
 */


router.patch("/edit",teamsController.editTeam);
/**
 * @swagger
 * /teams/edit:
 *   patch:
 *     summary: Modifier une équipe existante
 *     tags:
 *      - Équipes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             id: "1"
 *             name: "TL"
 *             description: "Équipe renommée"
 *     responses:
 *       200:
 *         description: Équipe modifiée avec succès.
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Erreur lors de la modification de l'équipe.
 */

router.delete("/:id",teamsController.deleteTeamByID);
/**
 * @swagger
 * /teams/{id}:
 *   delete:
 *     summary: Supprimer une équipe par ID
 *     tags:
 *     - Équipes
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: 1
 *         required: true
 *         description: ID de l'équipe à supprimer
 *     responses:
 *       200:
 *         description: Équipe supprimée avec succès.
 *       400:
 *         description: Équipe non trouvé
 *       500:
 *         description: Erreur lors de la suppression de l'équipe.
 */

router.get("/:id",teamsController.getTeamByID);



module.exports = router;