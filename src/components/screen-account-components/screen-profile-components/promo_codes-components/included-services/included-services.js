import React, { useRef, useEffect } from "react";
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";
import THEME from "src/THEME";
const IncludedServices = ({ showServices, services = [] }) => {
	const animHeight = useRef(new Animated.Value(0)).current;
	const factor = 1 / (Dimensions.get("window").width / 411);

	const startShowServices = () => {
		Animated.timing(animHeight, {
			toValue: services.length * 30 * factor,

			duration: 500,
			useNativeDriver: false,
		}).start();
	};
	const startCloseServices = () => {
		Animated.timing(animHeight, {
			toValue: 0,

			duration: 500,
			useNativeDriver: false,
		}).start();
	};

	useEffect(() => {
		showServices ? startShowServices() : startCloseServices();
	}, [showServices]);
	return (
		<Animated.View style={[styles.wrapServices, { height: animHeight }]}>
			{services.map((service) => {
				return (
					<View key={service.id} style={styles.rowServices}>
						<Text style={styles.title} numberOfLines={2}>
							{service.product}
						</Text>
						<Text style={styles.count}>
							{service.qty > 0 && `(${service.qty} шт)`}
						</Text>
						<Text style={styles.price}>{service.price}р</Text>
					</View>
				);
			})}
		</Animated.View>
	);
};
const styles = StyleSheet.create({
	wrapServices: {},
	rowServices: {
		marginTop: 10,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	title: {
		width: "45%",
		fontStyle: "italic",
		fontFamily: THEME.font.InterMedium,
		fontSize: 12,
		color: "#A8A8A8",
	},
	count: {
		width: "13%",
		textAlign: "center",
		fontFamily: THEME.font.InterMedium,
		fontSize: 12,
		color: "#A8A8A8",
	},
	price: {
		width: "15%",
		textAlign: "right",
		fontFamily: THEME.font.InterBold,
		fontSize: 12,
		color: THEME.colors.defaultText,
	},
});
export default IncludedServices;
