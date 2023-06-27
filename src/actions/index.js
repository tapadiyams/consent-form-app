import db from "../firebase";
import {
  GET_EMPLOYEES,
  SET_EMPLOYEE,
  GET_STONES,
  SET_LOADING_STATUS,
  GET_CUSTOMERS,
  GET_SELECTIONS,
  GET_FABRICATOR,
  GET_KITCHEN_AND_BATH,
  GET_DESIGNER_OR_ARCHITECT,
  GET_WEBSITE_CREDENTIALS,
} from "./actionType";

/*
 *
 * Collections constants
 *
 */
const websiteCredentialsCollection = db.collection("websiteCredentials");
const customersCollection = db.collection("customers");
const fabricatorsCollection = db.collection("fabricators");
const kitchenAndBathsCollection = db.collection("kitchenAndBaths");
const designerOrArchitectsCollection = db.collection("designerOrArchitects");
const selectionsCollection = db.collection("selections");
const employeesCollection = db.collection("employees");
const stonesCollection = db.collection("stones");

/*
 *
 * Actions
 *
 */
export const getWebsiteCredentials = (websiteCredentials) => ({
  type: GET_WEBSITE_CREDENTIALS,
  websiteCredentials: websiteCredentials,
});

export const setLoading = (status) => ({
  type: SET_LOADING_STATUS,
  status: status,
});

export const getEmployees = (employeesPayload) => {
  return {
    type: GET_EMPLOYEES,
    employeesPayload: employeesPayload,
  };
};

// Remember, it's a singular employee
export const setEmployee = (employeePayload) => {
  return {
    type: SET_EMPLOYEE,
    employeePayload: employeePayload,
  };
};

export const getStones = (stonesPayload) => ({
  type: GET_STONES,
  stonesPayload: stonesPayload,
});

export const getCustomers = (customersPayload) => ({
  type: GET_CUSTOMERS,
  customersPayload: customersPayload,
});

export const getSelections = (selectionsPayload) => ({
  type: GET_SELECTIONS,
  selectionsPayload: selectionsPayload,
});

export const getFabricators = (fabricatorsPayload) => ({
  type: GET_FABRICATOR,
  fabricatorsPayload: fabricatorsPayload,
});

export const getKitchenAndBath = (kitchenAndBathPayload) => ({
  type: GET_KITCHEN_AND_BATH,
  kitchenAndBathPayload: kitchenAndBathPayload,
});

export const getDesignerOrArchitect = (designerOrArchitectPayload) => ({
  type: GET_DESIGNER_OR_ARCHITECT,
  designerOrArchitectPayload: designerOrArchitectPayload,
});

/*
 *
 * Website
 *
 */
export function getWebsiteCredentialsAPI() {
  return (dispatch) => {
    websiteCredentialsCollection.onSnapshot((snapshot) => {
      let payload = snapshot.docs.map((doc) => doc.data());
      dispatch(getWebsiteCredentials(payload));
    });
  };
}

export function editWebsiteCredentialsAPI(payload) {
  const { websiteUserName, websitePassword } = payload;
  return (dispatch) => {
    websiteCredentialsCollection
      .get()
      .then((querySnapshot) => {
        // Check if a matching document exists
        if (querySnapshot.empty) {
          console.log(
            "Error has caused in editWebsiteCredentialsAPI(): querySnapshot is empty."
          );
          return;
        }

        const materialDocRef = querySnapshot.docs[0].ref;
        materialDocRef
          .update({
            websiteUserName: websiteUserName,
            websitePassword: websitePassword,
          })
          // .then(() => {
          // })
          .catch((error) => {
            // Dispatch an error action if needed
            console.log(
              "Error has caused in editWebsiteCredentialsAPI() while dispatching.",
              error
            );
          });
      })
      .catch((error) => {
        // Handle the error when querying the database
        console.log(
          "Error has caused in editWebsiteCredentialsAPI() while querying the database.",
          error
        );
      });
  };
}

/*
 *
 * Customers
 *
 */
export function addCustomerAPI(payload) {
  const {
    date,
    customerId,
    firstName,
    lastName,
    email,
    phone,
    address,
    imageURL,
  } = payload;

  return (dispatch) => {
    customersCollection.add({
      date: date,
      customerId: customerId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      address: address,
      imageURL: imageURL,
    });
  };
}

export function getCustomersListAPI() {
  return (dispatch) => {
    customersCollection.orderBy("customerId", "desc").onSnapshot((snapshot) => {
      let payload = snapshot.docs.map((doc) => doc.data());
      dispatch(getCustomers(payload));
    });
  };
}

// Delete the customers dataafter an year along with Fabricators, Selections, etc.
export function deleteCustomersAPI(customersList) {
  return (dispatch) => {
    const formattedDate = new Date();
    formattedDate.setFullYear(formattedDate.getFullYear() - 1); // Subtract one year from the current date

    customersList.forEach((customer) => {
      const { customerId, date } = customer;

      // Check if the customer's date is older than one year
      if (date < formattedDate) {
        const query = stonesCollection
          .where("customerId", "==", customerId)
          .where("date", "<", formattedDate);

        query
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.empty) {
              // Handle the case when no matching document is found
              console.log("Error: Customer not found.");
              return;
            }

            // Delete the matching documents
            querySnapshot.docs.forEach((doc) => {
              doc.ref.delete().catch((error) => {
                // Handle the error when deleting the document
                console.log("Error while deleting a document:", error);
              });
            });

            // Delete associated data
            dispatch(deleteFabricatorsAPI(customerId));
            dispatch(deleteKitchenAndBathsAPI(customerId));
            dispatch(deleteDesignerOrArchitectsAPI(customerId));
            dispatch(deleteSelectionsAPI(customerId));
          })
          .catch((error) => {
            // Handle the error when querying the database
            console.log("Error querying the database:", error);
          });
      }
    });
  };
}

/*
 *
 * Fabricators
 *
 */
export function addFabricatorAPI(payload) {
  const {
    customerId,
    fabricatorName,
    fabricatorAddress,
    fabricatorEmail,
    fabricatorPhone,
  } = payload;

  return (dispatch) => {
    fabricatorsCollection.add({
      customerId: customerId,
      fabricatorName: fabricatorName,
      fabricatorAddress: fabricatorAddress,
      fabricatorEmail: fabricatorEmail,
      fabricatorPhone: fabricatorPhone,
    });
  };
}

export function getFabricatorsAPI(payload) {
  return (dispatch) => {
    let query = fabricatorsCollection; // Initialize the query variable

    if (payload && payload.customerId) {
      query = query.where("customerId", "==", payload.customerId);
    }

    query.onSnapshot((snapshot) => {
      let data = snapshot.docs.map((doc) => doc.data());
      dispatch(getFabricators(data));
    });
  };
}

export function deleteFabricatorsAPI(customerId) {
  return () => {
    const query = fabricatorsCollection.where("customerId", "==", customerId);

    query
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          // Handle the case when no matching document is found
          console.log("Error: Fabricator not found.");
          return;
        }

        // Delete the matching documents
        querySnapshot.docs.forEach((doc) => {
          doc.ref.delete().catch((error) => {
            // Handle the error when deleting the document
            console.log("Error while deleting a Fabricator document:", error);
          });
        });
      })
      .catch((error) => {
        // Handle the error when querying the database
        console.log("Error querying the Fabricators collection:", error);
      });
  };
}

/*
 *
 * Kitchen And Baths
 *
 */
export function addKitchenAndBathAPI(payload) {
  const {
    customerId,
    kitchenAndBathName,
    kitchenAndBathEmail,
    kitchenAndBathPhone,
    kitchenAndBathAddress,
  } = payload;

  return (dispatch) => {
    kitchenAndBathsCollection.add({
      customerId: customerId,
      kitchenAndBathName: kitchenAndBathName,
      kitchenAndBathEmail: kitchenAndBathEmail,
      kitchenAndBathPhone: kitchenAndBathPhone,
      kitchenAndBathAddress: kitchenAndBathAddress,
    });
  };
}

export function getKitchenAndBathsAPI(payload) {
  return (dispatch) => {
    let query = kitchenAndBathsCollection; // Initialize the query variable

    if (payload.customerId) {
      query = query.where("customerId", "==", payload.customerId);
    }

    query.onSnapshot((snapshot) => {
      let data = snapshot.docs.map((doc) => doc.data());
      dispatch(getKitchenAndBath(data));
    });
  };
}

export function deleteKitchenAndBathsAPI(customerId) {
  return () => {
    const query = kitchenAndBathsCollection.where(
      "customerId",
      "==",
      customerId
    );

    query
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          // Handle the case when no matching document is found
          console.log("Error: KitchenAndBath not found.");
          return;
        }

        // Delete the matching documents
        querySnapshot.docs.forEach((doc) => {
          doc.ref.delete().catch((error) => {
            // Handle the error when deleting the document
            console.log(
              "Error while deleting a KitchenAndBath document:",
              error
            );
          });
        });
      })
      .catch((error) => {
        // Handle the error when querying the database
        console.log("Error querying the KitchenAndBaths collection:", error);
      });
  };
}

/*
 *
 * Designer Or Architects
 *
 */
export function addDesignerOrArchitectAPI(payload) {
  const {
    customerId,
    designerOrArchitectName,
    designerOrArchitectEmail,
    designerOrArchitectPhone,
    designerOrArchitectAddress,
  } = payload;

  return (dispatch) => {
    designerOrArchitectsCollection.add({
      customerId: customerId,
      designerOrArchitectName: designerOrArchitectName,
      designerOrArchitectEmail: designerOrArchitectEmail,
      designerOrArchitectPhone: designerOrArchitectPhone,
      designerOrArchitectAddress: designerOrArchitectAddress,
    });
  };
}

export function getDesignerOrArchitectsAPI(payload) {
  return (dispatch) => {
    let query = designerOrArchitectsCollection; // Initialize the query variable

    if (payload.customerId) {
      query = query.where("customerId", "==", payload.customerId);
    }

    query.onSnapshot((snapshot) => {
      let data = snapshot.docs.map((doc) => doc.data());
      dispatch(getDesignerOrArchitect(data));
    });
  };
}

export function deleteDesignerOrArchitectsAPI(customerId) {
  return () => {
    const query = designerOrArchitectsCollection.where(
      "customerId",
      "==",
      customerId
    );

    query
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          // Handle the case when no matching document is found
          console.log("Error: DesignerOrArchitect not found.");
          return;
        }

        // Delete the matching documents
        querySnapshot.docs.forEach((doc) => {
          doc.ref.delete().catch((error) => {
            // Handle the error when deleting the document
            console.log(
              "Error while deleting a DesignerOrArchitect document:",
              error
            );
          });
        });
      })
      .catch((error) => {
        // Handle the error when querying the database
        console.log(
          "Error querying the DesignerOrArchitects collection:",
          error
        );
      });
  };
}

/*
 *
 * Selections
 *
 */
export function addSelectionsAPI(payload) {
  const { category, customerId, material, size, thickness, finish, note } =
    payload;

  return (dispatch) => {
    selectionsCollection.add({
      customerId: customerId,
      category: category,
      material: material,
      size: size,
      thickness: thickness,
      finish: finish,
      note: note,
    });
  };
}

export function getSelectionsAPI(payload) {
  const { customerId } = payload;
  return (dispatch) => {
    selectionsCollection
      // .orderBy("material", "desc") // Don't uncomment this because it's causing indexing error
      .where("customerId", "==", customerId)
      .onSnapshot((snapshot) => {
        let data = snapshot.docs.map((doc) => doc.data());
        dispatch(getSelections(data));
      });
  };
}

export function deleteSelectionsAPI(payload) {
  return () => {
    let query = selectionsCollection.where(
      "customerId",
      "==",
      payload.customerId
    );
    if (payload.material) {
      query = query.where("material", "==", payload.material);
    }
    if (payload.size) {
      query = query.where("size", "==", payload.size);
    }
    if (payload.thickness) {
      query = query.where("thickness", "==", payload.thickness);
    }
    if (payload.finish) {
      query = query.where("finish", "==", payload.finish);
    }
    if (payload.note) {
      query = query.where("note", "==", payload.note);
    }
    query
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          // Handle the case when no matching document is found
          console.log("Error: Selections not found.");
          return;
        }
        // Delete the matching documents
        querySnapshot.docs.forEach((doc) => {
          doc.ref.delete().catch((error) => {
            // Handle the error when deleting the document
            console.log("Error while deleting a Selections document:", error);
          });
        });
      })
      .catch((error) => {
        // Handle the error when querying the database
        console.log("Error querying the Selections collection:", error);
      });
  };
}

/*
 *
 * Employees
 *
 */
export function addEmployeeAPI(payload) {
  const {
    employeeName,
    employeeEmail,
    employeePassword,
    employeeRole,
    isAdmin,
  } = payload;
  return (dispatch) => {
    employeesCollection.add({
      employeeName: employeeName,
      employeeEmail: employeeEmail,
      employeePassword: employeePassword,
      employeeRole: employeeRole,
      isAdmin: isAdmin,
    });
  };
}

// When a employee logs in then this function will be called.
// export function setEmployeeAPI(payload) {
//   const { employeeEmail, employeePassword } = payload;
//   return (dispatch) => {
//     const data = [
//       { employeeEmail: employeeEmail, employeePassword: employeePassword },
//     ];
//     dispatch(setEmployee(data));
//   };
// }

// export function setEmployeeAPI(payload) {
//   // const { employeeEmail, employeePassword } = payload;

//   console.log("Shubham, payload:", payload);

//   const dispatch = useDispatch();

//   const employeeData = {
//     employeeEmail: payload.employeeEmail,
//     employeePassword: payload.employeePassword,
//     employeeAuthority: "1",
//   };

//   console.log("Shubham, employeeData:", employeeData);
//   dispatch(setEmployee(employeeData));
// }

export function getEmployeesListAPI() {
  return (dispatch) => {
    employeesCollection
      .orderBy("employeeEmail", "desc")
      .onSnapshot((snapshot) => {
        let payload = snapshot.docs.map((doc) => doc.data());
        dispatch(getEmployees(payload));
      });
  };
}

export function editEmployeeAPI(payload) {
  const {
    employeeName,
    employeeEmail,
    employeePassword,
    employeeRole,
    isAdmin,
  } = payload;

  return (dispatch) => {
    // Query the materials collection to find the document with the given material name
    const query = employeesCollection.where(
      "employeeEmail",
      "==",
      employeeEmail
    );
    query
      .get()
      .then((querySnapshot) => {
        // Check if a matching document exists
        if (querySnapshot.empty) {
          console.log(
            "Error has caused in editEmployeeAPI(): querySnapshot is empty."
          );
          return;
        }

        const employeeDocRef = querySnapshot.docs[0].ref;
        employeeDocRef
          .update({
            // employeeEmail can not be changed
            employeeName: employeeName,
            employeePassword: employeePassword,
            employeeRole: employeeRole,
            isAdmin: isAdmin,
          })
          // .then(() => {
          // })
          .catch((error) => {
            // Dispatch an error action if needed
            console.log(
              "Error has caused in editEmployeeAPI() while dispatching.",
              error
            );
          });
      })
      .catch((error) => {
        // Handle the error when querying the database
        console.log(
          "Error has caused in editEmployeeAPI() while querying the database.",
          error
        );
      });
  };
}

export function deleteEmployeeAPI(payload) {
  const { employeeEmail } = payload;
  return (dispatch) => {
    const query = employeesCollection.where(
      "employeeEmail",
      "==",
      employeeEmail
    );

    query
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          // Handle the case when no matching document is found
          console.log(
            "Error has caused in deleteEmployeeAPI(): Material not found."
          );
          return;
        }

        // Delete the first matching document
        const employeeDocRef = querySnapshot.docs[0].ref;

        employeeDocRef.delete().catch((error) => {
          // Dispatch an error action if needed
          console.log(
            "Error has caused in deleteEmployeeAPI() while dispatching.",
            error
          );
        });
      })
      .catch((error) => {
        // Handle the error when querying the database
        console.log(
          "Error has caused in deleteEmployeeAPI() while querying the database.",
          error
        );
      });
  };
}

/*
 *
 * Stones
 *
 */
export function addStoneAPI(payload) {
  const { category, material, sizes, thicknesses, finish, bookmatch } = payload;

  return async (dispatch) => {
    try {
      await stonesCollection.add({
        category: category,
        material: material,
        sizes: sizes,
        thicknesses: thicknesses,
        finish: finish,
        bookmatch: bookmatch,
      });
    } catch (error) {
      console.log("Error has caused in addStoneAPI():", error);
    }
  };
}

export function getStonesListAPI() {
  return (dispatch) => {
    stonesCollection
      .orderBy("category")
      // .orderBy("material")
      .onSnapshot((snapshot) => {
        let payload = snapshot.docs.map((doc) => doc.data());
        dispatch(getStones(payload));
      });
  };
}

export function editStoneAPI(payload) {
  const { material, sizes, thicknesses, finish, bookmatch } = payload;

  return (dispatch) => {
    // Query the materials collection to find the document with the given material name
    const query = stonesCollection.where("material", "==", material);
    query
      .get()
      .then((querySnapshot) => {
        // Check if a matching document exists
        if (querySnapshot.empty) {
          console.log(
            "Error has caused in editStoneAPI(): querySnapshot is empty."
          );
          return;
        }

        const materialDocRef = querySnapshot.docs[0].ref;
        materialDocRef
          .update({
            sizes: sizes,
            thicknesses: thicknesses,
            finish: finish,
            bookmatch: bookmatch,
          })
          // .then(() => {
          // })
          .catch((error) => {
            // Dispatch an error action if needed
            console.log(
              "Error has caused in editStoneAPI() while dispatching.",
              error
            );
          });
      })
      .catch((error) => {
        // Handle the error when querying the database
        console.log(
          "Error has caused in editStoneAPI() while querying the database.",
          error
        );
      });
  };
}

export function deleteStoneAPI(payload) {
  const { material } = payload;
  return (dispatch) => {
    const query = stonesCollection.where("material", "==", material);

    query
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          // Handle the case when no matching document is found
          console.log(
            "Error has caused in deleteStoneAPI(): Material not found."
          );
          return;
        }

        // Delete the first matching document
        const stoneDocRef = querySnapshot.docs[0].ref;

        stoneDocRef.delete().catch((error) => {
          // Dispatch an error action if needed
          console.log(
            "Error has caused in deleteStoneAPI() while dispatching.",
            error
          );
        });
      })
      .catch((error) => {
        // Handle the error when querying the database
        console.log(
          "Error has caused in deleteStoneAPI() while querying the database.",
          error
        );
      });
  };
}
