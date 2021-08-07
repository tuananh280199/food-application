// import node_modules
import React from 'react';
import {Switch} from 'react-native-switch';

type SwitchProps = {
  toggleSwitch: Function,
  isEnabled: boolean,
};

const SwitchComponent = (props: SwitchProps) => {
  const {toggleSwitch, isEnabled} = props;
  return (
    <Switch
      onValueChange={toggleSwitch}
      value={isEnabled}
      circleSize={27}
      barHeight={30}
      backgroundActive={'#43bb6c'}
      backgroundInactive={'#cccccc'}
      circleBorderWidth={0.2}
      changeValueImmediately={true}
      renderActiveText={false}
      renderInActiveText={false}
      switchLeftPx={2.2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
      switchRightPx={2.2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
      switchWidthMultiplier={2} // multipled by the `circleSize` prop to calculate total width of the Switch
      switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
    />
  );
};
export {SwitchComponent};
