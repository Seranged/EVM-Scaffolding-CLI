import { abi } from '../contracts/abi';
export const res = readContract({
    abi,
    functionName: 'balanceOf',
    args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'],
});
