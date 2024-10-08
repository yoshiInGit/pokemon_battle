import type { AttackOptionsType } from "@/domain/attack";
import type { GymKeysType } from "@/domain/gym_pokemon";
import type { PlayerKeysType } from "@/domain/player_pokemon";
import type { SupportKeys } from "@/domain/support_card";

interface Props {
  attack: AttackOptionsType;
  "pokemon-set": PlayerKeysType;
  "start-battle": { gymLeaderKey: GymKeysType; playerKey: PlayerKeysType; supportCards: Record<SupportKeys, boolean> };
  "gym-selection": { key: GymKeysType };
  "show-attack-selections": { 0: string; 1: string; 2: string };
  "select-attack": 0 | 1 | 2;
  "reset-battle": unknown;
}

const channel = new BroadcastChannel("pokemon-battle");

export const postMessage = <Key extends keyof Props, Payload extends Props[Key]>(order: Key, payload: Payload) => {
  const messageId = Date.now().toString(16);

  const messagePromise = new Promise<void>((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error("Timeout"));
    }, 2000);

    channel.addEventListener("message", (event: MessageEvent) => {
      const data = event.data;
      if (data.messageId !== messageId) return;

      clearTimeout(timeoutId);
      resolve();
    });
  });

  channel.postMessage({
    order: order,
    payload: payload,
    messageId: messageId,
  });

  return messagePromise;
};

export const receiveMessage = <Key extends keyof Props, Payload extends Props[Key]>(order: Key): Promise<Payload> => {
  return new Promise((resolve) => {
    channel.addEventListener("message", (event: MessageEvent) => {
      const data = event.data;
      if (data.order !== order) return;
      channel.postMessage({ messageId: event.data.messageId });

      resolve(data.payload);
    });
  });
};
