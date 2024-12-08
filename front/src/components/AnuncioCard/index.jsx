import React from "react";
import {Button, FlexboxGrid, Panel} from "rsuite";
import {Edit, Trash} from "@rsuite/icons";

function AnuncioCard({imageUrl, titulo, onEdit, onDelete}) {
    return (
        <Panel bordered className="mb-3" style={{width: "400px"}}>
            <FlexboxGrid>
                <FlexboxGrid.Item colspan={6}>
                    <img
                        src={imageUrl}
                        alt="Imagem do anúncio"
                        style={{
                            maxWidth: "100%",
                            height: "auto",
                        }}
                    />
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={18} style={{paddingLeft: 20}}>
                    <p>{titulo}</p>
                    <div style={{marginTop: 15}}>
                        <Button appearance="subtle" startIcon={<Edit/>} style={{marginRight: 10}} onClick={onEdit}>
                            Editar anúncio
                        </Button>
                        <Button color="red" appearance="subtle" startIcon={<Trash/>} onClick={onDelete}>
                            Excluir anúncio
                        </Button>
                    </div>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </Panel>
    );
}

export default AnuncioCard;
