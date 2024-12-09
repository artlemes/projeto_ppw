import React, { useEffect, useState } from 'react';
import {
    Panel,
    Form,
    ButtonToolbar,
    Button,
    Input,
    SelectPicker,
    DatePicker,
    Message,
    useToaster,
} from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import useSendData from "../../services/useSendData";

function CriarAnuncio() {
    const { sendData, loading, error, data } = useSendData();
    const [formData, setFormData] = useState({
        titulo: '',
        categoria_id: '',
        descricao: '',
        preco: '',
        data_expiracao: null,
        visibilidade: 'privado', // Valor padrão
    });
    const [categorias, setCategorias] = useState([]);
    const [formError, setFormError] = useState(''); 
    const toaster = useToaster(); 

    const handleChange = (value, name) => {
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        if (!formData.usuario_id) {
          console.error("Usuário não autenticado");
          return;
        }
      
        // Garantir que o preço seja um número
        const formDataToSend = {
          ...formData,
          preco: Number(formData.preco),
          data_expiracao: new Date(formData.data_expiracao).toISOString(),  // Converter data para o formato ISO
        };
      
        try {
          const response = await sendData("anuncio", formDataToSend, "POST");
          toaster.push(
            <Message showIcon type="success">Anúncio criado com sucesso!</Message>,
            { placement: 'topCenter' }
          );
        } catch (err) {
          console.error("Erro na requisição:", err);
          toaster.push(
            <Message showIcon type="error">Erro ao criar anúncio!</Message>,
            { placement: 'topCenter' }
          );
        }
      };
      

    useEffect(() => {
        const fetchCategorias = async () => {
            const token = localStorage.getItem('token');
        
            try {
                const response = await fetch("https://bk-ti1x.onrender.com/categoria/buscar", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });
        
                if (!response.ok) {
                    throw new Error(`Erro HTTP: ${response.status}`);
                }
        
                const data = await response.json();
                const categoriasFormatadas = data.map((categoria) => ({
                    label: categoria.nome,
                    value: categoria._id,
                }));

                setCategorias(categoriasFormatadas);
            } catch (error) {
                console.error("Erro ao buscar categorias:", error);
            }
        };

        fetchCategorias();
    }, []);

    return (
        <Panel
            header={
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '20px',
                }}>
                    <h2>Criar anúncio</h2>
                </div>
            }
            bordered
            style={{
                maxWidth: '100%',
                padding: '50px',
                marginTop: '100px',
            }}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'center',
                gap: '15px',
                textAlign: 'center',
            }}>
                <img
                    src="https://cdn-icons-png.flaticon.com/128/3774/3774278.png"
                    alt="Ícone de anúncio"
                    style={{
                        width: '200px',
                        height: '200px',
                        alignSelf: 'center',
                    }}
                />

                <Form fluid>
                    <Form.Group>
                        <Form.ControlLabel>Título do Anúncio</Form.ControlLabel>
                        <Input
                            placeholder="Insira o título!"
                            value={formData.titulo}
                            onChange={(value) => handleChange(value, 'titulo')}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.ControlLabel>Categoria</Form.ControlLabel>
                        <SelectPicker
                            data={categorias}
                            placeholder="Selecione a categoria"
                            style={{ width: '100%' }}
                            value={formData.categoria_id}
                            onChange={(value) => handleChange(value, 'categoria_id')}
                        />
                        {formError && !formData.categoria_id && (
                            <span style={{ color: 'red' }}>Selecione uma categoria!</span>
                        )}
                    </Form.Group>

                    <Form.Group>
                        <Form.ControlLabel>Descrição</Form.ControlLabel>
                        <Input
                            as="textarea"
                            rows={5}
                            placeholder="Insira a descrição aqui!"
                            value={formData.descricao}
                            onChange={(value) => handleChange(value, 'descricao')}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.ControlLabel>Preço</Form.ControlLabel>
                        <Input
                            type="number"
                            placeholder="Insira o preço!"
                            value={formData.preco}
                            onChange={(value) => handleChange(value, 'preco')}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.ControlLabel>Data de Expiração</Form.ControlLabel>
                        <DatePicker
                            format="dd-mm-yyyy"
                            value={formData.data_expiracao}
                            onChange={(value) => handleChange(value, 'data_expiracao')}
                            placeholder="Selecione a data de expiração"
                            style={{ width: '100%' }}
                        />
                        {formError && !formData.data_expiracao && (
                            <span style={{ color: 'red' }}>A data de expiração é obrigatória!</span>
                        )}
                    </Form.Group>

                    <Form.Group>
                        <Form.ControlLabel>Visibilidade</Form.ControlLabel>
                        <SelectPicker
                            data={[
                                { label: 'Público', value: 'publico' },
                                { label: 'Privado', value: 'privado' },
                                { label: 'Compartilhado', value: 'compartilhado' }
                            ]}
                            value={formData.visibilidade}
                            onChange={(value) => handleChange(value, 'visibilidade')}
                            style={{ width: '100%' }}
                        />
                    </Form.Group>

                    {formError && (
                        <Message showIcon type="error">
                            {formError}
                        </Message>
                    )}

                    <Form.Group>
                        <ButtonToolbar>
                            <Button
                                appearance="primary"
                                onClick={handleSubmit}
                                loading={loading}
                                block
                            >
                                Criar anúncio
                            </Button>
                        </ButtonToolbar>
                    </Form.Group>
                </Form>
            </div>
        </Panel>
    );
}

export default CriarAnuncio;
