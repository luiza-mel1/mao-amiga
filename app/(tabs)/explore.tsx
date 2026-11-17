import { useCallback, useState } from 'react';
import { router, useFocusEffect } from 'expo-router';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { doacoesService, type Doacao } from '../../services/doacoesService';

export default function HistoricoDoacoes() {
  const [doacoes, setDoacoes] = useState<Doacao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);
  const [tentativa, setTentativa] = useState(0);
  const [pagina, setPagina] = useState(0);
  const [ultimaPagina, setUltimaPagina] = useState(true);

  useFocusEffect(useCallback(() => {
    let ativa = true;
    setCarregando(true);
    setErro(false);
    doacoesService.listar(pagina).then(resultado => {
      if (!ativa) return;
      setDoacoes(resultado.content);
      setUltimaPagina(resultado.page.number + 1 >= resultado.page.totalPages);
    }).catch(() => {
      if (ativa) setErro(true);
    }).finally(() => {
      if (ativa) setCarregando(false);
    });
    return () => { ativa = false; };
  }, [pagina, tentativa]));

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Text style={styles.titulo}>Histórico de doações</Text>
      <Pressable style={styles.botao} onPress={() => router.push('/cadastro')}>
        <Text style={styles.botaoTexto}>Cadastrar doação</Text>
      </Pressable>

      {carregando ? <ActivityIndicator accessibilityLabel="Carregando doações" /> : erro ? (
        <Pressable onPress={() => setTentativa(atual => atual + 1)}>
          <Text style={styles.link}>Falha ao carregar. Tentar novamente</Text>
        </Pressable>
      ) : (
        <>
          <FlatList
            data={doacoes}
            keyExtractor={item => item.id}
            ListEmptyComponent={<Text>Nenhuma doação nesta página.</Text>}
            renderItem={({ item }) => (
              <Pressable
                style={styles.card}
                onPress={() => router.push({ pathname: '/doacao', params: { id: item.id } })}
              >
                <Text style={styles.nome}>{item.tipoItem}</Text>
                <Text>Quantidade: {item.quantidade}</Text>
                <Text>Destino: {item.pontoDestino}</Text>
                <Text>{new Date(item.criadoEm).toLocaleDateString('pt-BR')}</Text>
              </Pressable>
            )}
          />
          <Text>Página {pagina + 1}</Text>
          {pagina > 0 && (
            <Pressable onPress={() => setPagina(atual => atual - 1)}>
              <Text style={styles.link}>Página anterior</Text>
            </Pressable>
          )}
          {!ultimaPagina && (
            <Pressable onPress={() => setPagina(atual => atual + 1)}>
              <Text style={styles.link}>Próxima página</Text>
            </Pressable>
          )}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6F8', padding: 16, gap: 12 },
  titulo: { fontSize: 24, fontWeight: '700', color: '#202124' },
  botao: { backgroundColor: '#1769AA', padding: 12, borderRadius: 8, alignItems: 'center' },
  botaoTexto: { color: '#FFF', fontWeight: '600' },
  card: { padding: 14, borderRadius: 8, marginBottom: 8, backgroundColor: '#FFF' },
  nome: { fontSize: 16, fontWeight: '700', color: '#202124' },
  link: { color: '#1769AA', paddingVertical: 6, fontWeight: '600' },
});
