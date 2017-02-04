class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */

    constructor(config) {
          this.config = config;
          this.currentState = config.initial;
          this.history = [];
          this.undos = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.currentState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (this.config.states[state]) {
            this.history.push(this.currentState);
            this.currentState = state;
            this.undos = [];
        }
        else {
          throw error;
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
            this.changeState(this.config.states[this.currentState].transitions[event]);
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.currentState = this.config.initial;
        this.clearHistory();
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
      var arr = [];
        if (!event) {
          for (var key in this.config.states) {
              arr.push(key);
          }
        } else {
          for (var key in this.config.states)
              if (this.config.states[key].transitions[event]) {
                  arr.push(key);
                }
        }
        return arr;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.history.length) {
            var previous = this.history.pop();
            this.undos.push(this.currentState);
            this.currentState = previous;
            return true;
        }
        return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.undos.length) {
            var previous = this.undos.pop();
            this.history.push(this.currentState);
            this.currentState = previous;
            return true;
        }
        return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.undos = [];
        this.history = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
