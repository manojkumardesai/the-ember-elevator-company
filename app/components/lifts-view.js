import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class LiftsViewComponent extends Component {
    liftTrack = {
        'lift-one': 0,
        'lift-two': 0,
        'lift-three': 0
    };
    @action
    goUp(floor) {
        const [nearestLift] = this.getNearestLift(floor);;
        const rectElement = document.getElementById(nearestLift);
        const currentClass = rectElement.getAttribute("class");
        if (currentClass) {
            rectElement.classList.remove(`${currentClass}`);
            rectElement.classList.add('upAnimation' + floor);
        } else {
            rectElement.classList.add('upAnimation1' + floor);
        }
        this.liftTrack[nearestLift] = floor;
    }
    @action
    goDown(floor) {
        const [nearestLift] = this.getNearestLift(floor);;
        const rectElement = document.getElementById(nearestLift);
        const currentClass = rectElement.getAttribute("class");
        if (currentClass) {
            rectElement.classList.remove(`${currentClass}`);
            rectElement.classList.add('downAnimation' + floor);
        } else {
            rectElement.classList.add('downAnimation' + floor);
        }
        this.liftTrack[nearestLift] = floor;
    }
    @action
    zero() {
        const [nearestLift] = this.getNearestLift(0);
        const rectElement = document.getElementById(nearestLift);
        const currentClass = rectElement.getAttribute("class");
        rectElement.classList.remove(`${currentClass}`);
        rectElement.classList.add('zeroUp');
        this.liftTrack[nearestLift] = 0;
    }

    getNearestLift(currentFloor) {
        return Object.entries(this.liftTrack).reduce((a, b) => {
            console.log(a, b);
            return Math.abs(b[1] - currentFloor) < Math.abs(a[1] - currentFloor) ? b : a;
        });
    }
}