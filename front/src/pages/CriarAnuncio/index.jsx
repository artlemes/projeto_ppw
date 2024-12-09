import React, { useEffect, useState } from 'react';
import {
    Panel,
    Form,
    ButtonToolbar,
    Button,
    Input,
    SelectPicker
} from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import useSendData from "../../services/useSendData";

function CriarAnuncio() {
    const { sendData, loading, error, data } = useSendData();
    const [formData, setFormData] = useState({
        titulo: '',
        categoria: '',
        descricao: ''
    });
    const [categorias, setCategorias] = useState([]);

    const handleChange = (value, name) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        await sendData("anuncio", formData, "POST");
        console.log(formData);
    };

    useEffect(() => {
        const fetchCategorias = async () => {
            const token = localStorage.getItem('token');
        
            try {
                const response = await fetch("https://bk-ti1x.onrender.com/categoria/buscar", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` // Inclui o token no cabeçalho
                    }
                });
        
                if (!response.ok) {
                    throw new Error(`Erro HTTP: ${response.status}`);
                }
        
                const data = await response.json();

                // Transformando para o formato esperado pelo SelectPicker
                const categoriasFormatadas = data.map((categoria) => ({
                    label: categoria.nome, // Nome exibido
                    value: categoria.id,   // Valor retornado ao selecionar
                }));

                setCategorias(categoriasFormatadas)
                
            } catch (error) {
                console.error("Erro na requisição:", error);
                return null; // Retorna null em caso de erro
            }
        };

        fetchCategorias();
    }, [sendData]);

    return (
        <Panel
            header={
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '20px'
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
                textAlign: 'center'
            }}>
                <img
                    src='https://cdn-icons-png.flaticon.com/128/3774/3774278.png'
                    alt="Ícone de anúncio"
                    style={{
                        width: '200px',
                        height: '200px',
                        alignSelf: 'center'
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
                            value={formData.categoria}
                            onChange={(value) => handleChange(value, 'categoria')}
                        />
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
                        <ButtonToolbar>
                            <Button
                                appearance="primary"
                                onClick={handleSubmit}
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
