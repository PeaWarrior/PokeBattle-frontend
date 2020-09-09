import { createConsumer } from '@rails/actioncable';

const consumer = createConsumer('ws://localhost:3001/consumer');

export default consumer;

// blue_team = {
//     team_name: 'Team Rocket',
//     {
//         pokemon_id: 1,
//         nickname: 'nickname',
//         shiny: false,
//         hp: 100
//     },
//     {
//         pokemon_id: 1,
//         nickname: 'nickname',
//         shiny: false,
//         hp: 100
//     },
//     {
//         pokemon_id: 1,
//         nickname: 'nickname',
//         shiny: false,
//         hp: 100
//     }
// }