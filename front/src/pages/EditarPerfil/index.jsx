import React, { useState, useEffect } from "react";
import { Form, Button, Schema, Panel, Message } from "rsuite";
import { useNavigate } from "react-router-dom";
import useSendData from "../../services/useSendData.js";

function EditarPerfil() {
  const { sendData, loading, error, data } = useSendData(); 
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState(null);
  const [success, setSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);  // Novo estado para o sucesso da exclusão
  const navigate = useNavigate();

  const model = Schema.Model({
    nome: Schema.Types.StringType().isRequired("O nome é obrigatório!"),
    sobrenome: Schema.Types.StringType().isRequired("O sobrenome é obrigatório!"),
    email: Schema.Types.StringType().isEmail("Insira um email válido!"),
    telefone: Schema.Types.StringType().isRequired("O telefone é obrigatório!"),
  });

  useEffect(() => {
    // Verifica se já carregou os dados
    const fetchUserData = async () => {
      if (data) {
        // Apenas atualiza o estado se os dados forem recebidos
        setUserData(data);
        setFormData(data); // Preenche o formulário com os dados do usuário
      }
    };

    if (!userData) {
      sendData("usuario/logado", null, "GET", false).then(fetchUserData);
    }
  }, [sendData, userData, data]); // Depende de userData para não chamar repetidamente

  const handleSubmit = async (formData) => {
    await sendData(`usuario/${userData?._id}`, formData, "PATCH");
    if (!error) {
      setSuccess(true);
      setTimeout(() => navigate("/perfil"), 2000); 
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.")) {
      try {
        const token = localStorage.getItem("token"); // Assume que o token está armazenado no localStorage
        const response = await fetch(`https://bk-ti1x.onrender.com/usuario/${userData?._id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao excluir conta");
        }

        setDeleteSuccess(true);
        setTimeout(() => {
          navigate("/login"); // Redireciona para login após a exclusão
        }, 2000);
      } catch (err) {
        setDeleteSuccess(false);
        alert("Erro ao excluir conta: " + err.message);
      }
    }
  };

  // Exibe a mensagem de carregamento ou erro, caso necessário
  if (!formData && !error) {
    return <Message type="info">Carregando informações...</Message>;
  }

  return (
    <Panel header="Editar Perfil" bordered style={{ maxWidth: 600, margin: "auto", marginTop: "130px" }}>
      <Form
        fluid
        model={model}
        formValue={formData} // Usa o estado `formData`
        onChange={(value) => setFormData(value)} // Atualiza `formData` conforme o usuário edita
        onSubmit={handleSubmit}
      >
        <Form.Group controlId="nome">
          <Form.ControlLabel>Nome</Form.ControlLabel>
          <Form.Control name="nome" />
        </Form.Group>
        <Form.Group controlId="sobrenome">
          <Form.ControlLabel>Sobrenome</Form.ControlLabel>
          <Form.Control name="sobrenome" />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.ControlLabel>Email</Form.ControlLabel>
          <Form.Control name="email" />
        </Form.Group>
        <Form.Group controlId="telefone">
          <Form.ControlLabel>Telefone</Form.ControlLabel>
          <Form.Control name="telefone" />
        </Form.Group>
        {error && <Message type="error">{error.message}</Message>}
        {success && <Message type="success">Perfil atualizado com sucesso!</Message>}
        {deleteSuccess && <Message type="success">Conta excluída com sucesso. Redirecionando...</Message>}
        <Form.Group>
          <Button appearance="primary" type="submit" loading={loading} disabled={loading}>
            Salvar Alterações
          </Button>
          <Button appearance="default" onClick={() => navigate("/perfil")} style={{ marginLeft: 10 }}>
            Cancelar
          </Button>
        </Form.Group>
        <Form.Group>
          <Button appearance="danger" onClick={handleDeleteAccount} style={{ marginTop: 20 }}>
            Excluir Conta
          </Button>
        </Form.Group>
      </Form>
    </Panel>
  );
}

export default EditarPerfil;
