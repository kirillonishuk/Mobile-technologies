import React from 'react';
import { Dimensions, StyleSheet, Text, View, Button, StatusBar } from 'react-native';

const victory = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [null, null, null,
        null, null, null,
        null, null, null
      ],
      whoseTurn: 'X',
      win: false,
      score: [0, 0]
    }
  }

  componentDidUpdate = () => {
    this.checkOnVictory();
  }

  onPressButton = (value) => {
    if (!this.state.win && !this.state.grid[value])
      this.setState((prevState) => {
        return {
          grid: prevState.grid.map((elem, id, array) => {
            if (id === value && !elem) return prevState.whoseTurn
            else return elem;
          }),
          whoseTurn: prevState.whoseTurn === 'X' ? 'O' : 'X'
        }
      })
  }

  checkOnVictory = () => {
    for (let i = 0; i < victory.length; i++) {
      if (
        !this.state.win &&
        this.state.grid[victory[i][0]] &&
        this.state.grid[victory[i][0]] === this.state.grid[victory[i][1]] &&
        this.state.grid[victory[i][1]] === this.state.grid[victory[i][2]]
      ) {
        this.setState((prevState) => {
          return {
            win: true,
            score: prevState.whoseTurn === 'X' ? [prevState.score[0], prevState.score[1] + 1]
              : [prevState.score[0] + 1, prevState.score[1]]
          }
        }
        )
      }
    }
  }

  restartGame = () => {
    this.setState({
      grid: [null, null, null,
        null, null, null,
        null, null, null
      ],
      whoseTurn: 'X',
      win: false
    })
  }

  newGame = () => {
    this.setState({
      grid: [null, null, null,
        null, null, null,
        null, null, null
      ],
      whoseTurn: 'X',
      win: false,
      score: [0, 0]
    })
  }

  render() {
    const X = this.state.score[0] > this.state.score[1] ? [styles.winner, styles.score] : styles.score,
      Y = this.state.score[0] < this.state.score[1] ? [styles.winner, styles.score] : styles.score;
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
        />
        <View style={styles.header}>
          <Text style={X}>{this.state.score[0]}</Text>
          <Button
            title='New game'
            onPress={() => this.newGame()}
          />
          <Text style={Y}>{this.state.score[1]}</Text>
        </View>
        <Text
          style={styles.turn}
        >
          {!this.state.win ? `Turn: ${this.state.whoseTurn}` : `Win : ${this.state.whoseTurn === 'X' ? 'O' : 'X'}`}
        </Text>
        <View style={styles.grid}>
          <Text onPress={() => this.onPressButton(0)} style={[styles.cels1, styles.cels]}>{this.state.grid[0]}</Text>
          <Text onPress={() => this.onPressButton(1)} style={[styles.cels2, styles.cels]}>{this.state.grid[1]}</Text>
          <Text onPress={() => this.onPressButton(2)} style={[styles.cels3, styles.cels]}>{this.state.grid[2]}</Text>
          <Text onPress={() => this.onPressButton(3)} style={[styles.cels4, styles.cels]}>{this.state.grid[3]}</Text>
          <Text onPress={() => this.onPressButton(4)} style={[styles.cels5, styles.cels]}>{this.state.grid[4]}</Text>
          <Text onPress={() => this.onPressButton(5)} style={[styles.cels6, styles.cels]}>{this.state.grid[5]}</Text>
          <Text onPress={() => this.onPressButton(6)} style={[styles.cels7, styles.cels]}>{this.state.grid[6]}</Text>
          <Text onPress={() => this.onPressButton(7)} style={[styles.cels8, styles.cels]}>{this.state.grid[7]}</Text>
          <Text onPress={() => this.onPressButton(8)} style={[styles.cels9, styles.cels]}>{this.state.grid[8]}</Text>
        </View>
        <Button
          title={!this.state.win ? 'Restart' : 'New round'}
          onPress={() => this.restartGame()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  turn: {
    fontSize: 32,
    marginBottom: 20
  },
  grid: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20
  },
  cels: {
    fontSize: 42,
    textAlign: 'center',
    lineHeight: 48
  },
  cels1: {
    width: 48,
    height: 48,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#000'
  },
  cels2: {
    width: 48,
    height: 48,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#000'
  },
  cels3: {
    width: 48,
    height: 48,
    borderBottomWidth: 1,
    borderColor: '#000'
  },
  cels4: {
    width: 48,
    height: 48,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#000'
  },
  cels5: {
    width: 48,
    height: 48,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#000'
  },
  cels6: {
    width: 48,
    height: 48,
    borderBottomWidth: 1,
    borderColor: '#000'
  },
  cels7: {
    width: 48,
    height: 48,
    borderRightWidth: 1,
    borderColor: '#000'
  },
  cels8: {
    width: 48,
    height: 48,
    borderRightWidth: 1,
    borderColor: '#000'
  },
  cels9: {
    width: 48,
    height: 48,
  },
  header: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    top: 50,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  score: {
    fontSize: 42,
    marginLeft: 25,
    marginRight: 25
  },
  winner: {
    color: 'green'
  }
});
