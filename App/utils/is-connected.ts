import * as Network from 'expo-network';

export async function isConnected() {
  const { isConnected } = await Network.getNetworkStateAsync();

  return !!isConnected;
}
