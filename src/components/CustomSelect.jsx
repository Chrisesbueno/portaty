import { View } from "react-native";
import React from "react";
import Icon from "./Icon";
import CustomText from "./CustomText";
import CustomSwitch from "./CustomSwitch";

const CustomSelect = ({
  title,
  subtitle,
  styled = {},
  icon = { left: {}, right: {} },
  toogle,
}) => {
  return (
    <View style={styled.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styled.iconLeft}>
          {icon.left && (
            <Icon
              name={icon.left.name}
              size={icon.left.size}
              color={icon.left.color}
              type={icon.left.type}
            />
          )}
        </View>
        <CustomText title={title} subtitle={subtitle} styled={styled.text} />
      </View>

      {icon.right && (
        <View style={styled.iconRight}>
          <Icon
            name={icon.right.name}
            size={icon.right.size}
            color={icon.right.color}
            type={icon.right.type}
          />
        </View>
      )}
      {toogle && (
        <CustomSwitch
          global={toogle}
          styled={styled.switch}
          colors={{
            track: {
              false: "#767577",
              true: "#ffa424",
            },
            thumb: {
              false: "#f4f3f4",
              true: "#FFFFFF",
            },
          }}
        />
      )}
    </View>
  );
};

export default CustomSelect;
