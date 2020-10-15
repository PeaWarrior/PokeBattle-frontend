import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Rival from './Rival';
import User from './User';
import BattleMove from './BattleMove';
import consumer from '../../Cable';

const URL = 'http://localhost:3001/';

export default function Battle(props) {
    const history = useHistory();
    const location = useLocation();
    const { battleId, currentUserId } = location.state;

    const [start, setStart] = useState(true);
    const [user, setUser] = useState(null);
    const [rival, setRival] = useState(null);
    const [userActive, setUserActive] = useState({
        nickname: null,
        sprite: null,
        hp: null,
        maxhp: null,
        moves: [],
        index: 0
    });
    const [rivalActive, setRivalActive] = useState({
        sprite: null,
        hp: null,
        maxhp: null,
        moves: null,
        index: 0
    });
    const [turn, setTurn] = useState(null);
    const [message, setMessage] = useState('');
    const ws = useRef(null);
    const audio = useRef(null);

    useEffect(() => {
        ws.current = consumer.subscriptions.create({
            channel: "BattleChannel",
            currentUser: currentUserId,
            battle: battleId
        },
        {
            connected: () => console.log('CONNECTED!!'),
            disconnected: () => console.log("DISCONNECTED FROM BATTLE"),
        })
        return () => {
            ws.current.unsubscribe();
        }
    }, [battleId, currentUserId])

    useEffect(() => {
        ws.current.received = (data) => {
            if (data === 'DONE') {
                return
            }
            if (start && data.users.length > 1) {
                setStart(false);
                startBattleMusic();
                startBattle(data);
            } else if (data.users.length > 1 && !data.winner) {
                attackProcedure(data);
            } else if (data.winner) {
                winProcedure(data);
            }
        }
    });

    const winProcedure = (data) => {
        const redUser = data.users[0];
        if (currentUserId === redUser.id) {
            const redPokemonHp = data.red_team.pokemons[userActive.index].stats.hp;
            const bluePokemonHp = data.blue_team.pokemons[rivalActive.index].stats.hp;

            setTurn(data.turn);
            setMessage(data.message);
            
            setTimeout(() => {
                setRivalActive(prevState => ({
                    ...prevState,
                    hp: bluePokemonHp
                }));
                setUserActive(prevState => ({
                    ...prevState,
                    hp: redPokemonHp
                }));
            }, 1000)
            if (redPokemonHp <= 0 || bluePokemonHp <= 0) {
                setRivalActive(prevState => ({
                    ...prevState,
                    moves: []
                }));
                setUserActive(prevState => ({
                    ...prevState,
                    moves: []
                }));
            }
            if (redPokemonHp <= 0) {
                setTimeout(() => {
                    setMessage(`${userActive.nickname} has fainted!`);
                }, 2000)
                setTimeout(() => {
                    setMessage('You are out of pokemon! You are unable to continue.')
                }, 4000)
            }
            if (bluePokemonHp <= 0) {
                setTimeout(() => {
                    setMessage(`${rivalActive.nickname} has fainted!`);
                }, 2000)
                setTimeout(() => {
                    setMessage(prevState => (`${data.users[1].username} is out of pokemon! They are unable to continue!`));
                }, 4000)
            }
            setTimeout(() => {
                audio.current.pause();
                startVictoryMusic();
                history.push({
                    pathname: '/teams'
                })
            }, 8000)
        } else {
            const redPokemonHp = data.red_team.pokemons[rivalActive.index].stats.hp;
            const bluePokemonHp = data.blue_team.pokemons[userActive.index].stats.hp;
            
            setMessage(data.message);
            setTurn(data.turn);

            setTimeout(() => {
                setUserActive(prevState => ({
                    ...prevState,
                    hp: bluePokemonHp,
                }));
                setRivalActive(prevState => ({
                    ...prevState,
                    hp: redPokemonHp
                }));
            }, 1000)
            setUserActive(prevState => ({
                ...prevState,
                moves: []
            }))
            setRivalActive(prevState => ({
                ...prevState,
                moves: []
            }))

            if (bluePokemonHp <= 0) {
                setTimeout(() => {
                    setMessage(`${userActive.nickname} has fainted!`);
                }, 2000)
                setTimeout(() => {
                    setMessage(prevState => ('You are out of pokemon! You are unable to continue!'));
                }, 4000)
            }
            if (redPokemonHp <= 0) {
                setTimeout(() => {
                    setMessage(`${rivalActive.nickname} has fainted!`);
                }, 2000)
                setTimeout(() => {
                    setMessage(`${data.users[0].username} has run out of pokemon! They are unable to continue! `)
                }, 4000)
            }
            setTimeout(() => {
                audio.current.pause();
                startVictoryMusic();
                history.push({
                    pathname: '/teams'
                })
            }, 8000)
        }
    }

    const attackProcedure = (data) => {
        const redUser = data.users[0];
        const redActive = data.red_active;
        const blueUser = data.users[1];
        const blueActive = data.blue_active;
        const currentRedPokemon = data.red_team.pokemons[redActive];
        const currentBluePokemon = data.blue_team.pokemons[blueActive];

        if (currentUserId === redUser.id) {
            const redPokemonHp = data.red_team.pokemons[userActive.index].stats.hp;
            const bluePokemonHp = data.blue_team.pokemons[rivalActive.index].stats.hp;

            setTurn(data.turn);
            setMessage(data.message);
            
            setTimeout(() => {
                setRivalActive(prevState => ({
                    ...prevState,
                    hp: bluePokemonHp
                }));
            }, 1000);
            setTimeout(() => {
                setUserActive(prevState => ({
                    ...prevState,
                    hp: redPokemonHp
                }));
            }, 1000)

            if (redPokemonHp <= 0) {
                setTimeout(() => {
                    setMessage(`${userActive.nickname} has fainted!`);
                    setUserActive(prevState => ({
                        ...prevState,
                        moves: []
                    }))
                }, 2000)
                setTimeout(() => {
                    setUserActive(prevState => ({
                        ...prevState,
                        nickname: currentRedPokemon.name,
                        sprite: currentRedPokemon.shiny ? currentRedPokemon.sprites.back_shiny : currentRedPokemon.sprites.back,
                        hp: currentRedPokemon.stats.hp,
                        maxhp: currentRedPokemon.stats.hp,
                        moves: currentRedPokemon.moves,
                        index: redActive
                    }))
                    setMessage(prevState => (`Go ${currentRedPokemon.name}!`));
                }, 7000)
            }
            if (bluePokemonHp <= 0) {
                setTimeout(() => {
                    setMessage(`${rivalActive.nickname} has fainted!`);
                    setRivalActive(prevState => ({
                        ...prevState,
                        moves: []
                    }))
                }, 2000)
                setTimeout(() => {
                    setRivalActive(prevState => ({
                        ...prevState,
                        nickname: currentBluePokemon.name,
                        sprite: currentBluePokemon.shiny ? currentBluePokemon.sprites.front_shiny : currentBluePokemon.sprites.front,
                        hp: currentBluePokemon.stats.hp,
                        maxhp: currentBluePokemon.stats.hp,
                        moves: currentBluePokemon.moves,
                        index: blueActive
                    }))
                    setMessage(prevState => (`${blueUser.username} sent out ${currentBluePokemon.name}!`));
                }, 7000)
            }
        } else {
            const redPokemonHp = data.red_team.pokemons[rivalActive.index].stats.hp;
            const bluePokemonHp = data.blue_team.pokemons[userActive.index].stats.hp;
            
            setMessage(data.message);
            setTurn(data.turn);

            setTimeout(() => {
                setUserActive(prevState => ({
                    ...prevState,
                    hp: bluePokemonHp,
                }));
            }, 1000)
            setTimeout(() => {
                setRivalActive(prevState => ({
                    ...prevState,
                    hp: redPokemonHp
                }));
            }, 1000)
            if (bluePokemonHp <= 0) {
                setTimeout(() => {
                    setMessage(`${userActive.nickname} has fainted!`);
                    setUserActive(prevState => ({
                        ...prevState,
                        moves: []
                    }))
                }, 2000)
                setTimeout(() => {
                    setUserActive(prevState => ({
                        ...prevState,
                        nickname: currentBluePokemon.name,
                        sprite: currentBluePokemon.shiny ? currentBluePokemon.sprites.back_shiny : currentBluePokemon.sprites.back,
                        hp: currentBluePokemon.stats.hp,
                        maxhp: currentBluePokemon.stats.hp,
                        moves: currentBluePokemon.moves,
                        index: blueActive
                    }))
                    setMessage(prevState => (`Go ${currentBluePokemon.name}!`));
                }, 7000)
            }
            if (redPokemonHp <= 0) {
                setTimeout(() => {
                    setMessage(`${rivalActive.nickname} has fainted!`);
                    setRivalActive(prevState => ({
                        ...prevState,
                        moves: []
                    }))
                }, 2000)
                setTimeout(() => {
                    setRivalActive(prevState => ({
                        ...prevState,
                        nickname: currentRedPokemon.name,
                        sprite: currentRedPokemon.shiny ? currentRedPokemon.sprites.front_shiny : currentRedPokemon.sprites.front,
                        hp: currentRedPokemon.stats.hp,
                        maxhp: currentRedPokemon.stats.hp,
                        moves: currentRedPokemon.moves,
                        index: redActive
                    }))
                    setMessage(prevState => (`${redUser.username} sent out ${currentRedPokemon.name}!`));
                }, 7000)
            }
        }
    }

    const startBattle = (data) => {
        setTimeout(() => {
            setStart(false)
            if (currentUserId === data.users[0].id) {
                setUser(data.users[0].id);
                setRival(data.users[1].id);
                initActives(data, data.red_active, data.blue_active);
            } else {
                setUser(data.users[1].id);
                setRival(data.users[0].id);
                initActives(data, data.red_active, data.blue_active);
            }
        }, 4000);
    }

    const initActives = (data, redActive, blueActive) => {
        const redUser = data.users[0];
        const blueUser = data.users[1];
        const currentRedPokemon = data.red_team.pokemons[redActive];
        const currentBluePokemon = data.blue_team.pokemons[blueActive];
        console.log(currentRedPokemon)

        if (currentUserId == redUser.id) {
            setTimeout(() => {
                setMessage(`${blueUser.username} sent out ${currentBluePokemon.name}!`)
                setRivalActive({
                    nickname: currentBluePokemon.name,
                    sprite: currentBluePokemon.shiny ? currentBluePokemon.sprites.front_shiny : currentBluePokemon.sprites.front,
                    hp: currentBluePokemon.stats.hp,
                    maxhp: currentBluePokemon.stats.hp,
                    moves: currentBluePokemon.moves,
                    index: blueActive
                });
            }, 5000);
            setTimeout(() => {
                setMessage(`${redUser.username} sent out ${currentRedPokemon.name}!`)
                setUserActive({
                    nickname: currentRedPokemon.name,
                    sprite: currentRedPokemon.shiny ? currentRedPokemon.sprites.back_shiny : currentRedPokemon.sprites.back,
                    hp: currentRedPokemon.stats.hp,
                    maxhp: currentRedPokemon.stats.hp,
                    moves: currentRedPokemon.moves,
                    index: redActive
                });
                setTurn(data.turn);
                
            }, 8000)
        } else {
            setTimeout(() => {
                setMessage(`${redUser.username} sent out ${currentRedPokemon.name}!`)
                setRivalActive({
                    nickname: currentRedPokemon.name,
                    sprite: currentRedPokemon.shiny ? currentRedPokemon.sprites.front_shiny : currentRedPokemon.sprites.front,
                    hp: currentRedPokemon.stats.hp,
                    maxhp: currentRedPokemon.stats.hp,
                    moves: currentRedPokemon.moves,
                    index: redActive
                });
            }, 5000)
            setTimeout(() => {
                setMessage(`${blueUser.username} sent out ${currentBluePokemon.name}!`)
                setUserActive({
                    nickname: currentBluePokemon.name,
                    sprite: currentBluePokemon.shiny ? currentBluePokemon.sprites.back_shiny : currentBluePokemon.sprites.back,
                    hp: currentBluePokemon.stats.hp,
                    maxhp: currentBluePokemon.stats.hp,
                    moves: currentBluePokemon.moves,
                    index: blueActive
                });
                setTurn(data.turn);
            }, 8000)
        }
    }

    const handleClickFight = (moveIndex) => {
        fetch(`${URL}fight`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                battle: {
                    id: battleId,
                    move_index: moveIndex
                }
            })
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
    }

    const renderMoves = () => {
        return userActive.moves.map((move, index) => <BattleMove key={move.id} moveIndex={index} {...move} handleClickFight={handleClickFight} />)
    }

    const startBattleMusic = () => {
        audio.current = new Audio('https://vgmdownloads.com/soundtracks/pokemon-original-game-soundtrack/mckmelhq/115%20-%20battle%20%28vs%20trainer%29.mp3')
        audio.current.volume = 0.01;
        audio.current.play();
    };

    const startVictoryMusic = () => {
        audio.current = new Audio('https://vgmdownloads.com/soundtracks/pokemon-original-game-soundtrack/qxjdgirm/116%20-%20victory%20%28vs%20trainer%29.mp3')
        audio.current.volume = 0.01;
        audio.current.play();
    }

    return (
        <Container fluid={'xl'}>
            {user && rival ?
            <>
            <Container className="battleGrass">
                {rivalActive.sprite ?
                <Rival {...rivalActive} />
                :
                null
                }
                {userActive.sprite ? 
                <User {...userActive} />
                :
                null
                }
            </Container>
            <Container className="regCard">
                <Row>
                    <Col md={8} className="message">
                        <p>{message}</p>
                    </Col>
                    <Col md={4}>
                        <Row className="battleMoveList">
                            {turn == currentUserId ? renderMoves() : null}
                        </Row>
                    </Col>
                </Row>
            </Container>
            </>
            :
            <Container>
                Waiting for player to join...
            </Container>
            }
        </Container>
    )
}