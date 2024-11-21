import { AxiosError } from "axios";
import CustomButton from "components/button";
import CustomInput from "components/input";
import { useAuth } from "contexts/auth-context";
import { api } from "infra/api";
import { EntoResearchInterface } from "interface/searchinterface";
import { useState } from "react";
import { StyleSheet, ScrollView, View, Text, Button, TouchableOpacity, TextInput } from "react-native";

export default function EntoResearch () {
    const [formData, setFormData] = useState<EntoResearchInterface[]>([{
        numero_quar: 0,
        sequencia: 0,
        lado: '',
        logradouro: '',
        numero_casa: 0,
        complemento: '',
        id_tipo_imovel: 0,
        hora_entrada: '',
        visita: '',
        pendencia: '',
        depositos_eliminados: 0,
        imovel_tratado: true,
        id_servico: 0
    }]);
    const {handleApiRequest} = useAuth();

    const handleChange = (name: string, value: unknown) => {
        setFormData(prevFormData => {
            const newData = [...prevFormData];
            newData[0] = { ...newData[0], [name]: value };
            return newData;
        });
    };

    const sendData = async () => {
        handleApiRequest(async () => {
            try {
                const response = await api.post("/rpc/cadastro_pesquisas_entomologicas", {
                    numero_quar: formData[0].numero_quar,
                    sequencia: formData[0].sequencia,
                    lado: formData[0].lado,
                    logradouro: formData[0].logradouro,
                    numero_casa: formData[0].numero_casa,
                    complemento: formData[0].complemento,
                    id_tipo_imovel: formData[0].id_tipo_imovel,
                    hora_entrada: formData[0].hora_entrada,
                    visita: formData[0].visita,
                    pendencia: formData[0].pendencia,
                    depositos_eliminados: formData[0].depositos_eliminados,
                    imovel_tratado: formData[0].imovel_tratado === true,
                    id_servico: formData[0].id_servico
                }, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
    
                console.log("Dados enviados com sucesso:", response.data);
            } catch (error: AxiosError | any) {
                console.error("Erro ao enviar os dados:", error);
                if (error.response) {
                    console.log("Status:", error.response.status);
                    console.log("Data:", error.response.data);
                    console.log("Headers:", error.response.headers);
                } else {
                    console.log("Error message:", error.message);
                }
            }
            
        })
    };

    return (
        <View style={styles.background}>
            <View style={styles.header}>
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 25}}>DENSYS</Text>
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>PESQUISA ENTOMOLÓGICA / TRATAMENTO</Text>
            </View>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.all_input}>
                    <View style={styles.input_content}>
                        <Text style={{color: '#fff'}}>Nº Quart.</Text>
                        <TextInput
                            style={styles.input_quart_seq_lado}
                            placeholder="Numero Quar"
                            value={formData[0].numero_quar.toString()}
                            onChangeText={(value) => handleChange("numero_quar", value)}
                        />

                    </View>
                    <View style={styles.input_content}>
                        <Text style={{color: '#fff'}}>Sequência</Text>
                        <TextInput 
                            style={styles.input_quart_seq_lado} 
                            value={formData[0].sequencia.toString()} 
                            onChangeText={value => handleChange("sequencia", value)}>
                        </TextInput>
                    </View>
                    <View style={styles.input_content}>
                        <Text style={{color: '#fff'}}>Lado</Text>
                        <TextInput 
                            style={styles.input_quart_seq_lado} 
                            value={formData[0]?.lado} 
                            onChangeText={value => handleChange("lado", value)}>
                        </TextInput>
                    </View>
                </View>
                <View style={styles.all_input}>
                    <View style={styles.input_content}>
                        <Text style={{color: '#fff'}}>Nome do Logradouro</Text>
                        <TextInput 
                            style={styles.input_log} 
                            value={formData[0]?.logradouro} 
                            onChangeText={value => handleChange("logradouro", value)}>
                        </TextInput>
                    </View>
                </View>
                <View style={styles.all_input}>
                    <View style={styles.input_content}>
                        <Text style={{color: '#fff'}}>Nº</Text>
                        <TextInput 
                            style={styles.input_quart_seq_lado} 
                            value={formData[0]?.numero_casa.toString()} 
                            onChangeText={value => handleChange("numero_casa", value)}></TextInput>
                    </View>
                    <View style={styles.input_content}>
                        <Text style={{color: '#fff'}}>Bairro</Text>
                        <TextInput style={styles.input_bairro} value={""} onChange={() => {}}></TextInput>
                    </View>
                </View>
                <View style={styles.all_input}>
                    <View style={styles.input_content}>
                        <Text style={{color: '#fff'}}>CEP</Text>
                        <TextInput style={styles.input_cep_imov} value={""} onChange={() => {}}></TextInput>
                    </View>
                </View>
                <View style={styles.all_input}>
                    <View style={styles.input_content}>
                        <Text style={{color: '#fff'}}>Tipo do Imóvel</Text>
                        <TextInput 
                            style={styles.input_cep_imov} 
                            value={formData[0].id_tipo_imovel.toString()} 
                            onChangeText={value => handleChange("id_tipo_imovel", value)}></TextInput>
                    </View>
                    <View style={styles.input_content}>
                        <Text style={{color: '#fff'}}>Hor. Entrada</Text>
                        <TextInput 
                            style={styles.input_hor_entrd} 
                            value={formData[0]?.hora_entrada} 
                            onChangeText={value => handleChange("hora_entrada", value)}>
                        </TextInput>
                    </View>
                    <View style={styles.input_content}>
                        <Text style={{color: '#fff'}}>Visita</Text>
                        <TextInput 
                            style={styles.input_hor_entrd} 
                            value={formData[0]?.visita} 
                            onChangeText={value => handleChange("visita", value)}>
                        </TextInput>
                    </View>
                </View>

                <View style={styles.linehr}></View>

                <View style={styles.all_input}>
                <View style={styles.input_content}>
                    <Text style={{color: '#fff'}}>Pendência</Text>
                        <TextInput 
                            style={styles.input_dep_el} 
                            value={formData[0]?.pendencia} 
                            onChangeText={value => handleChange('pendencia', value)}>
                        </TextInput>
                    </View>
                </View>

                <View style={styles.linehr}></View>

                <Text style={{color: '#fff', textAlign: 'left', width: '95%', fontWeight: 'bold', fontSize: 16, marginBottom: 15}}>Tratamento</Text>
                <View style={styles.all_input}>
                    <View style={styles.input_content}>
                        <Text style={{color: '#fff'}}>Depósitos Eliminados</Text>
                        <TextInput 
                            style={styles.input_dep_el} 
                            value={formData[0]?.depositos_eliminados.toString()} 
                            onChangeText={value => handleChange('depositos_eliminados', value)}>
                        </TextInput>
                    </View>
                    <View style={styles.input_content}>
                        <Text style={{color: '#fff'}}>Imóv. Trat.</Text>
                        <TextInput 
                            style={styles.input_imov_trat} 
                            value={formData[0]?.imovel_tratado.toString()} 
                            onChangeText={value => handleChange('imovel_tratado', value)}>
                        </TextInput>
                    </View>
                </View>

                <View style={styles.all_input}>
                <View style={styles.input_content}>
                    <Text style={{color: '#fff'}}>Id do serviço</Text>
                        <TextInput 
                            style={styles.input_dep_el} 
                            value={formData[0]?.id_servico.toString()} 
                            onChangeText={value => handleChange('id_servico', value)}>
                        </TextInput>
                    </View>
                </View>

            </ScrollView>
            <View style={styles.bottom_nav}>
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={() => {}} style={styles.button1}>
                        <Text style={{color: '#fff', fontWeight: 'bold'}}>Voltar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={sendData} style={styles.button2}>
                        <Text style={{color: '#fff', fontWeight: 'bold'}}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#000',
        gap: 10,
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30
    },
    header: {
        width: '100%',
        height: 100,
        backgroundColor: '#171717',
        justifyContent: 'center',
        padding: 20
        // position: 'absolute',
        // top: 0,
        // right: 0,
        // left: 0,
        // color: '#ffffff',
    },
    linehr: {
        width: '95%',
        marginTop: 25,
        marginBottom: 10,
        backgroundColor: '#fff',
        height: 2
    },
    all_input: {
        width: '95%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 10
    },
    all_input2: {
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 20
    },
    input_content: {
        flexDirection: 'column',
        gap: 5  
    },
    input_quart_seq_lado: {
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        width: 110,
        height: 40,
        lineHeight: 32,
        fontSize: 20,
    },
    input_bairro: {
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        width: 250,
        height: 40,
        lineHeight: 32,
        fontSize: 20,
    },
    input_log: {
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        width: 390,
        height: 40,
        lineHeight: 32,
        fontSize: 20,
    },
    input_cep_imov: {
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        width: 150,
        height: 40,
        lineHeight: 32,
        fontSize: 20,
    },
    input_hor_entrd: {
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        width: 100,
        height: 40,
        lineHeight: 32,
        fontSize: 20,
    },
    input_insp: {
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        width: 50,
        height: 40,
        lineHeight: 32,
        fontSize: 20,
        marginBottom: 5
    },
    input_insp_mov: {
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        width: 230,
        height: 40,
        lineHeight: 32,
        fontSize: 20,
    },
    input_col_amst: {
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        width: 230,
        height: 40,
        lineHeight: 32,
        fontSize: 20,
    },
    input_inicial: {
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        width: 100,
        height: 40,
        lineHeight: 32,
        fontSize: 20,
    },
    input_final: {
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        width: 100,
        height: 40,
        lineHeight: 32,
        fontSize: 20,
    },
    input_dep_el: {
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        width: 185,
        height: 40,
        lineHeight: 32,
        fontSize: 20,
    },
    input_imov_trat: {
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        width: 185,
        height: 40,
        lineHeight: 32,
        fontSize: 20,
    },
    input_tipo: {
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        width: 120,
        height: 40,
        lineHeight: 32,
        fontSize: 20,
    },
    input_gramasd: {
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        width: 120,
        height: 40,
        lineHeight: 32,
        fontSize: 20,
    },
    input_dep_tra: {
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        width: 120,
        height: 40,
        lineHeight: 32,
        fontSize: 20,
    },
    bottom_nav: {
        width: '100%',
        height: 80,
        backgroundColor: '#171717',
        alignItems: 'center',
        justifyContent: 'center',
        // position: 'absolute',
        // bottom: 0,
        // right: 0,
        // left: 0,
    },
    buttons: {
        width: '90%',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    button1: {
        width: 120,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#474747',
        borderRadius: 10
    },
    button2: {
        width: 120,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6A5DFE',
        borderRadius: 10
    }
})