const renderElements = () => {
    const yourNameDiv = dom.create({
      type: "div",
      parent: container,
      classes: ["yourNameDiv"],
    });
    dom.create({
      type: "input",
      parent: yourNameDiv,
      classes: ["yourName"],
      attr: { name: "playerName", placeholder: "Player name.." },
    }),
      dom.create({
        type: "button",
        parent: yourNameDiv,
        content: "Enter your name",
        classes: ["btn", "yourNameBtn"],
      }),
      dom.create({
        type: "label",
        parent: settings,
        content: "Choose a program language:"
      }),
      dom.create({
        type: "select",
        parent: settings,
        content: "Program language:",
        classes: ['yourName']
      }),
      dom.create({
        type: "label",
        parent: settings,
        content: "Select time per question:"
      }),
      dom.create({
        type: "select",
        parent: settings,
        content: "Program language:",
        attr: {id: "time"}
      })
  };
export default renderElements;