<?php
/**
 * Endpoint para gestión de contactos
 * GET /api/endpoints/contacts.php - Listar todos los contactos
 * POST /api/endpoints/contacts.php - Crear nuevo contacto
 */

include_once __DIR__ . '/../config/cors.php';
include_once __DIR__ . '/../config/database.php';
include_once __DIR__ . '/../models/Contact.php';

$database = new Database();
$db = $database->getConnection();

$contact = new Contact($db);

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Listar contactos
        $stmt = $contact->getAll();
        $num = $stmt->rowCount();

        if ($num > 0) {
            $contacts_arr = array();
            $contacts_arr["records"] = array();

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $contact_item = array(
                    "id" => $id,
                    "nombre" => $nombre,
                    "email" => $email,
                    "empresa" => $empresa,
                    "plan" => $plan,
                    "mensaje" => $mensaje,
                    "created_at" => $created_at
                );

                array_push($contacts_arr["records"], $contact_item);
            }

            http_response_code(200);
            echo json_encode($contacts_arr);
        } else {
            http_response_code(200);
            echo json_encode(array("records" => array()));
        }
        break;

    case 'POST':
        // Crear nuevo contacto
        $data = json_decode(file_get_contents("php://input"));

        if (
            !empty($data->nombre) &&
            !empty($data->email)
        ) {
            $contact->nombre = $data->nombre;
            $contact->email = $data->email;
            $contact->empresa = $data->empresa ?? '';
            $contact->plan = $data->plan ?? '';
            $contact->mensaje = $data->mensaje ?? '';

            if ($contact->create()) {
                http_response_code(201);
                echo json_encode(array(
                    "message" => "Contacto creado exitosamente.",
                    "id" => $contact->id
                ));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "No se pudo crear el contacto."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Datos incompletos. Nombre y email son obligatorios."));
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(array("message" => "Método no permitido."));
        break;
}

