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
            const response = await sendData("categoria/buscar", null, "GET");
            if (response) {
                setCategorias(response.data); // Supondo que o endpoint retorna um array de categorias
            }
            else {
                console.log('nao respondeu nada porra')
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
