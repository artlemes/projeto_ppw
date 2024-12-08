import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, DatePicker, SelectPicker, CheckPicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

function ModalAnuncio ({
                          isOpen,
                          onClose,
                          onSubmit,
                          initialData = null,
                          usuariosList = [], // Lista de usuários para compartilhamento
                      }) {

    const user = JSON.parse(localStorage.getItem('user'));

    const [formData, setFormData] = useState(initialData || {
        titulo: '',
        descricao: '',
        preco: null,
        usuario_id: user.id,
        data_expiracao: null,
        visibilidade: 'privado',
        compartilhado_com: []
    });

    const visibilidadeOptions = [
        { label: 'Privado', value: 'privado' },
        { label: 'Público', value: 'publico' },
        { label: 'Restrito', value: 'restrito' }
    ];

    const handleChange = (value, name) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        // Validação básica
        const { titulo, descricao, preco, data_expiracao } = formData;

        if (!titulo || !descricao || !preco || !data_expiracao) {
            alert('Por favor, preencha todos os campos obrigatórios');
            return;
        }

        onSubmit(formData);
        onClose();
    };

    return (
        <Modal open={isOpen} onClose={onClose} size="md">
            <Modal.Header>
                <Modal.Title>Cadastrar Novo Produto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form fluid>
                    <Form.Group controlId="titulo">
                        <Form.ControlLabel>Título</Form.ControlLabel>
                        <Input
                            name="titulo"
                            value={formData.titulo}
                            onChange={(value) => handleChange(value, 'titulo')}
                        />
                    </Form.Group>

                    <Form.Group controlId="descricao">
                        <Form.ControlLabel>Descrição</Form.ControlLabel>
                        <Input
                            as="textarea"
                            rows={3}
                            name="descricao"
                            value={formData.descricao}
                            onChange={(value) => handleChange(value, 'descricao')}
                        />
                    </Form.Group>

                    <Form.Group controlId="preco">
                        <Form.ControlLabel>Preço</Form.ControlLabel>
                        <InputNumber
                            prefix="R$"
                            min={0}
                            step={0.01}
                            name="preco"
                            value={formData.preco}
                            onChange={(value) => handleChange(value, 'preco')}
                        />
                    </Form.Group>

                    <Form.Group controlId="usuario_id">
                        <Form.ControlLabel>Usuário</Form.ControlLabel>
                        <SelectPicker
                            data={usuariosList}
                            name="usuario_id"
                            value={formData.usuario_id}
                            onChange={(value) => handleChange(value, 'usuario_id')}
                            block
                        />
                    </Form.Group>

                    <Form.Group controlId="data_expiracao">
                        <Form.ControlLabel>Data de Expiração</Form.ControlLabel>
                        <DatePicker
                            name="data_expiracao"
                            value={formData.data_expiracao}
                            onChange={(value) => handleChange(value, 'data_expiracao')}
                            block
                        />
                    </Form.Group>

                    <Form.Group controlId="visibilidade">
                        <Form.ControlLabel>Visibilidade</Form.ControlLabel>
                        <SelectPicker
                            data={visibilidadeOptions}
                            name="visibilidade"
                            value={formData.visibilidade}
                            onChange={(value) => handleChange(value, 'visibilidade')}
                            block
                        />
                    </Form.Group>

                    <Form.Group controlId="compartilhado_com">
                        <Form.ControlLabel>Compartilhado Com</Form.ControlLabel>
                        <CheckPicker
                            data={usuariosList}
                            name="compartilhado_com"
                            value={formData.compartilhado_com}
                            onChange={(value) => handleChange(value, 'compartilhado_com')}
                            block
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <button
                    className="btn btn-primary"
                    onClick={handleSubmit}
                >
                    Salvar
                </button>
                <button
                    className="btn btn-secondary ml-2"
                    onClick={onClose}
                >
                    Cancelar
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalAnuncio;