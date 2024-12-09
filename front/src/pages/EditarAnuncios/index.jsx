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
import { useParams } from 'react-router-dom';

function EditarAnuncio() { // Recebe o ID do anúncio como prop
    const anuncioId = useParams()
    const { sendData } = useSendData();
    const [formData, setFormData] = useState({
        titulo: '',
        categoria: '',
        descricao: ''
    });
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (value, name) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await sendData(`anuncio/${anuncioId}`, formData, "PATCH"); // Envia as alterações como PUT
            console.log("Anúncio atualizado:", formData);
        } catch (error) {
            console.error("Erro ao atualizar o anúncio:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Carregar as categorias
        const fetchCategorias = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch("https://bk-ti1x.onrender.com/categoria/buscar", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`Erro HTTP: ${response.status}`);
                }

                const data = await response.json();
                const categoriasFormatadas = data.map((categoria) => ({
                    label: categoria.nome,
                    value: categoria.id
                }));

                setCategorias(categoriasFormatadas);
            } catch (error) {
                console.error("Erro ao buscar categorias:", error);
            }
        };

        // Carregar os dados do anúncio para edição
        const fetchAnuncio = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`https://bk-ti1x.onrender.com/anuncio/${anuncioId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`Erro HTTP: ${response.status}`);
                }

                const data = await response.json();
                setFormData({
                    titulo: data.titulo,
                    categoria: data.categoriaId, // Supondo que o backend retorna o ID da categoria
                    descricao: data.descricao
                });
            } catch (error) {
                console.error("Erro ao carregar anúncio:", error);
            }
        };

        fetchCategorias();
        fetchAnuncio();
    }, [anuncioId]);

    return (
        <Panel
            header={
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '20px'
                }}>
                    <h2>Editar Anúncio</h2>
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
                                loading={loading}
                                block
                            >
                                Atualizar anúncio
                            </Button>
                        </ButtonToolbar>
                    </Form.Group>
                </Form>
            </div>
        </Panel>
    );
}

export default EditarAnuncio;
