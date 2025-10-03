<?php
/**
 * Modelo de Contacto
 */

class Contact {
    private $conn;
    private $table_name = "contacts";

    public $id;
    public $nombre;
    public $email;
    public $empresa;
    public $plan;
    public $mensaje;
    public $created_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    /**
     * Crear un nuevo contacto
     */
    public function create() {
        $query = "INSERT INTO " . $this->table_name . "
                (nombre, email, empresa, plan, mensaje, created_at)
                VALUES
                (:nombre, :email, :empresa, :plan, :mensaje, NOW())
                RETURNING id";

        $stmt = $this->conn->prepare($query);

        // Sanitizar datos
        $this->nombre = htmlspecialchars(strip_tags($this->nombre));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->empresa = htmlspecialchars(strip_tags($this->empresa));
        $this->plan = htmlspecialchars(strip_tags($this->plan));
        $this->mensaje = htmlspecialchars(strip_tags($this->mensaje));

        // Bind valores
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":empresa", $this->empresa);
        $stmt->bindParam(":plan", $this->plan);
        $stmt->bindParam(":mensaje", $this->mensaje);

        if ($stmt->execute()) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->id = $row['id'];
            return true;
        }

        return false;
    }

    /**
     * Obtener todos los contactos
     */
    public function getAll() {
        $query = "SELECT * FROM " . $this->table_name . " ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    /**
     * Obtener un contacto por ID
     */
    public function getById() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = :id LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            $this->nombre = $row['nombre'];
            $this->email = $row['email'];
            $this->empresa = $row['empresa'];
            $this->plan = $row['plan'];
            $this->mensaje = $row['mensaje'];
            $this->created_at = $row['created_at'];
            return true;
        }

        return false;
    }
}

