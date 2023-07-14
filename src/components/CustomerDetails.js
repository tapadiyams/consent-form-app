import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  deleteSelectionsAPI,
  editCustomerAPI,
  editSelectionAPI,
  getCustomersListAPI,
  getDesignerOrArchitectsAPI,
  getFabricatorsAPI,
  getKitchenAndBathsAPI,
  getSelectionsAPI,
} from "../actions";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { EditCustomerDetails } from "./customerDetails/EditCustomerDetails";
import { EditSelection } from "./customerDetails/EditSelection";

const CustomerDetails = ({
  customers,
  fabricator,
  kitchenAndBath,
  designerOrArchitect,
  selections,

  getCustomersList,
  getFabricator,
  getKitchenAndBath,
  getDesignerOrArchitect,
  getSelections,

  editCustomer,
  editSelection,

  deleteSelection,
}) => {
  /**
   *
   * Define states and constants
   *
   */
  const history = useHistory();

  const { t } = useTranslation();
  // To break the statements
  const formattedConsentText = t("access_agreement_text").replace(
    /\n/g,
    "<br>"
  );

  const { id } = useParams();
  const customerId = parseInt(id, 10);
  const customer = customers.find(
    (customer) => customer.customerId === customerId
  );

  const [isEditCustomerModalOpen, setEditCustomerModalOpen] = useState(false);
  const [isEditSelectionModalOpen, setEditSelectionModalOpen] = useState(false);

  // Selection changes
  const [selectionId, setSelectionId] = useState("");
  const [oldPricing, setOldPricing] = useState("");
  const [oldNote, setOldNote] = useState("");

  /**
   *
   * Define hooks
   *
   */
  useEffect(() => {
    const fetchData = async (customerId) => {
      await getCustomersList(); // Wait for the data to be fetched
      await getSelections(customerId);
      await getFabricator(customerId);
      await getKitchenAndBath(customerId);
      await getDesignerOrArchitect(customerId);
    };

    fetchData(customerId);
  }, [
    customerId,
    getCustomersList,
    getSelections,
    getFabricator,
    getKitchenAndBath,
    getDesignerOrArchitect,
  ]);

  if (!customer) {
    return <div>Customer not found</div>;
  }

  /**
   *
   * Define functions
   *
   */
  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    history.push("/view");
  };

  // const handleEmail = (email) => {};

  const handleCustomerEdits = () => {
    setEditCustomerModalOpen(true); // Open the edit modal
  };

  // Function to handle saving changes in the edit modal
  const handleCustomerSaveChanges = (updatedData) => {
    editCustomer(updatedData);
    setEditCustomerModalOpen(false);
  };

  const handleEditSelection = (selectionId, pricing, note) => {
    setSelectionId(selectionId);
    setOldPricing(pricing);
    setOldNote(note);
    setEditSelectionModalOpen(true);
  };

  const handleSelectionSaveChanges = (updatedData) => {
    editSelection(updatedData); // Call the editCustomer function with the updated data
    setEditSelectionModalOpen(false); // Close the edit modal
  };

  const handleRemoveSelection = (selection) => {
    const payload = {
      customerId: selection?.customerId,
      material: selection?.material,
      size: selection?.size,
      thickness: selection?.thickness,
      finish: selection?.finish,
      note: selection?.note,
    };
    deleteSelection(payload);
  };

  return (
    <Container>
      <Navigations>
        <Button onClick={handleBack}>Back</Button>
        <Button onClick={handlePrint}>Print</Button>
        {/* <Button onClick={handleEmail(customer.email)}>Email</Button> */}
      </Navigations>
      <LogoTitle>
        <Logo src="/images/reliancewhite.png" alt="" />
        <CompanyInfo>
          <Title>Reliance Granite and Marble, Corp</Title>
          <CompanyDetails>
            <h2>50 Boright Ave, Kenilworth, NJ 07033</h2>
            <h2>Phone: (908) 624-1995</h2>
            <h2>Fax: (908) 624-1996</h2>
            <h2>info@reliancestones.com</h2>
          </CompanyDetails>
        </CompanyInfo>
      </LogoTitle>
      <Data>
        <Header>
          <h2>CUSTOMER SELECTION SHEET</h2>
        </Header>

        <Table>
          <TableRow>
            <CustomerDetailTableHeader>Date Visited</CustomerDetailTableHeader>
            <TableData>{customer.date}</TableData>
          </TableRow>
          <TableRow>
            <CustomerDetailTableHeader>Customer Id</CustomerDetailTableHeader>
            <TableData>{customer.customerId}</TableData>
          </TableRow>
          <TableRow>
            <CustomerDetailTableHeader>Name</CustomerDetailTableHeader>
            <TableData>
              {customer.firstName} {customer.lastName}
            </TableData>
          </TableRow>
          <TableRow>
            <CustomerDetailTableHeader>Email</CustomerDetailTableHeader>
            <TableData>{customer.email}</TableData>
          </TableRow>
          <TableRow>
            <CustomerDetailTableHeader>Phone</CustomerDetailTableHeader>
            <TableData>{customer.phone}</TableData>
          </TableRow>
          <TableRow>
            <CustomerDetailTableHeader>Address</CustomerDetailTableHeader>
            <TableData>{customer.address}</TableData>
          </TableRow>
          <TableRow>
            <button onClick={handleCustomerEdits}>Edit</button>
          </TableRow>
        </Table>

        {/* Render the edit modal if isEditCustomerModalOpen is true */}
        {isEditCustomerModalOpen && (
          <EditCustomerDetails
            customer={customer}
            onSaveChanges={handleCustomerSaveChanges}
            onCancel={() => setEditCustomerModalOpen(false)}
          />
        )}

        <CustomerDetailData>
          <Table>
            <TableRow>
              <CustomerDetailTableHeader>Fabricator</CustomerDetailTableHeader>
              <TableData>
                {fabricator && fabricator[0]?.fabricatorName}
              </TableData>
            </TableRow>
            <TableRow>
              <CustomerDetailTableHeader>Address</CustomerDetailTableHeader>
              <TableData>
                {fabricator && fabricator[0]?.fabricatorAddress}
              </TableData>
            </TableRow>
            <TableRow>
              <CustomerDetailTableHeader>Email</CustomerDetailTableHeader>
              <TableData>
                {fabricator && fabricator[0]?.fabricatorEmail}
              </TableData>
            </TableRow>
            <TableRow>
              <CustomerDetailTableHeader>Phone</CustomerDetailTableHeader>
              <TableData>
                {fabricator && fabricator[0]?.fabricatorPhone}
              </TableData>
            </TableRow>
          </Table>

          <Table>
            <TableRow>
              <CustomerDetailTableHeader>
                Kitchen and Bath
              </CustomerDetailTableHeader>
              <TableData>
                {kitchenAndBath && kitchenAndBath[0]?.kitchenAndBathName}
              </TableData>
            </TableRow>
            <TableRow>
              <CustomerDetailTableHeader>Address</CustomerDetailTableHeader>
              <TableData>
                {kitchenAndBath && kitchenAndBath[0]?.kitchenAndBathAddress}
              </TableData>
            </TableRow>
            <TableRow>
              <CustomerDetailTableHeader>Email</CustomerDetailTableHeader>
              <TableData>
                {kitchenAndBath && kitchenAndBath[0]?.kitchenAndBathEmail}
              </TableData>
            </TableRow>
            <TableRow>
              <CustomerDetailTableHeader>Phone</CustomerDetailTableHeader>
              <TableData>
                {kitchenAndBath && kitchenAndBath[0]?.kitchenAndBathPhone}
              </TableData>
            </TableRow>
          </Table>

          <Table>
            <TableRow>
              <CustomerDetailTableHeader>
                Designer / Architect
              </CustomerDetailTableHeader>
              <TableData>
                {designerOrArchitect &&
                  designerOrArchitect[0]?.designerOrArchitectName}
              </TableData>
            </TableRow>
            <TableRow>
              <CustomerDetailTableHeader>Address</CustomerDetailTableHeader>
              <TableData>
                {designerOrArchitect &&
                  designerOrArchitect[0]?.designerOrArchitectAddress}
              </TableData>
            </TableRow>
            <TableRow>
              <CustomerDetailTableHeader>Email</CustomerDetailTableHeader>
              <TableData>
                {designerOrArchitect &&
                  designerOrArchitect[0]?.designerOrArchitectEmail}
              </TableData>
            </TableRow>
            <TableRow>
              <CustomerDetailTableHeader>Phone</CustomerDetailTableHeader>
              <TableData>
                {designerOrArchitect &&
                  designerOrArchitect[0]?.designerOrArchitectPhone}
              </TableData>
            </TableRow>
          </Table>
        </CustomerDetailData>

        <SelectionTable>
          <thead>
            <tr>
              <TableHeader>No.</TableHeader>
              <TableHeader>CATEGORIES</TableHeader>
              <TableHeader>MATERIALS</TableHeader>
              <TableHeader>SIZE</TableHeader>
              <TableHeader>THICKNESS</TableHeader>
              <TableHeader>PRICING</TableHeader>
              <TableHeader>NOTES</TableHeader>
              <TableHeader>EDITS</TableHeader>
              <TableHeader>REMOVE</TableHeader>
            </tr>
          </thead>
          <tbody>
            {selections.map((selection, index) => {
              const rowNumber = index + 1;
              const isEvenRow = rowNumber % 2 === 0;

              return (
                <tr key={index}>
                  <TableCell rowNumber={rowNumber} isEvenRow={isEvenRow}>
                    {rowNumber}
                  </TableCell>
                  <TableCell rowNumber={rowNumber} isEvenRow={isEvenRow}>
                    {selection.category}
                  </TableCell>
                  <TableCell rowNumber={rowNumber} isEvenRow={isEvenRow}>
                    {selection.material}
                  </TableCell>
                  <TableCell rowNumber={rowNumber} isEvenRow={isEvenRow}>
                    {selection.size}
                  </TableCell>
                  <TableCell rowNumber={rowNumber} isEvenRow={isEvenRow}>
                    {selection.thickness}
                  </TableCell>
                  <TableCell rowNumber={rowNumber} isEvenRow={isEvenRow}>
                    {selection.pricing}
                  </TableCell>
                  <TableCell rowNumber={rowNumber} isEvenRow={isEvenRow}>
                    {selection.note}
                  </TableCell>
                  <TableCell rowNumber={rowNumber} isEvenRow={isEvenRow}>
                    <button
                      onClick={() =>
                        handleEditSelection(
                          selection.selectionId,
                          selection.pricing,
                          selection.note
                        )
                      }
                    >
                      EDIT
                    </button>
                  </TableCell>
                  <TableCell rowNumber={rowNumber} isEvenRow={isEvenRow}>
                    <button onClick={() => handleRemoveSelection(selection)}>
                      REMOVE
                    </button>
                  </TableCell>
                </tr>
              );
            })}
          </tbody>
        </SelectionTable>

        {/* Render the edit modal if isEditSelectionModalOpen is true */}
        {isEditSelectionModalOpen && (
          <EditSelection
            customerId={customerId}
            selectionId={selectionId}
            oldPricing={oldPricing}
            oldNote={oldNote}
            onSaveChanges={handleSelectionSaveChanges}
            onCancel={() => setEditSelectionModalOpen(false)}
          />
        )}

        <Consent>
          <p dangerouslySetInnerHTML={{ __html: formattedConsentText }}></p>
        </Consent>

        <Footer>
          <FooterContent>
            {customer.imageURL ? (
              <img
                src={customer.imageURL}
                alt="customer signature"
                style={{
                  display: "block",
                  margin: "0 auto",
                  width: "150px",
                }}
              />
            ) : null}
            <h2>Customer's Signature</h2>
          </FooterContent>

          <FooterContent>
            <h2>{(customer && customer?.assistedBy) || ""}</h2>
            <h2>Sale's Representative</h2>
          </FooterContent>
        </Footer>
      </Data>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 99vh;
`;

const Navigations = styled.div`
  display: flex;
  justify-content: end;
`;

const LogoTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 10px;
`;

const Logo = styled.img`
  height: 120px;
  width: 190px;
`;

const CompanyInfo = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  border-bottom: 1.2px solid white;
`;

const CompanyDetails = styled.div`
  margin-left: 100px;
  h2 {
    font-size: 1rem;
  }
`;

const Data = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  display: flex;

  h2 {
    font-size: xx-large;
    align-items: center;
  }
`;

const Button = styled.button`
  background-color: green;
  color: white;
  padding: 10px 30px;
  border: none;
  border-radius: 4px;
  margin-bottom: 20px;
  margin-left: 10px;
  z-index: 1;
  cursor: pointer;

  &:hover {
    background-color: darkgreen;
  }
`;

const CustomerDetailData = styled.div`
  display: flex;
  gap: 10px;
  width: 80%;
`;

const Table = styled.table`
  margin-bottom: 20px;
  border: 2px solid white;
  z-index: 1;
  width: 60%;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #666666;
  }
`;

const CustomerDetailTableHeader = styled.th`
  color: white;
  text-align: start;
`;

const TableHeader = styled.th`
  color: white;
  text-align: center;
`;

const TableData = styled.td`
  text-align: left;
`;

const TableCell = styled.td`
  text-align: center;
  background-color: ${(props) => (props.isEvenRow ? "#666666" : "transparent")};
`;

const SelectionTable = styled.table`
  border: 2px solid white;
  width: 80%;
`;

const Consent = styled.div`
  width: 80%;
  padding: 10px;

  p {
    font-size: small;
  }
`;

const Footer = styled.footer`
  display: flex;
  width: 100%;
  justify-content: space-between;
  max-width: 80%;
  align-items: end;
  /* margin-top: 100px; */
  height: 100%;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const mapStateToProps = (state) => {
  return {
    customers: state.customerState.customers,
    fabricator: state.customerState.fabricator,
    kitchenAndBath: state.customerState.kitchenAndBath,
    designerOrArchitect: state.customerState.designerOrArchitect,
    selections: state.customerState.selections,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCustomersList: () => dispatch(getCustomersListAPI()),
  getFabricator: (customerId) => dispatch(getFabricatorsAPI({ customerId })),
  getKitchenAndBath: (customerId) =>
    dispatch(getKitchenAndBathsAPI({ customerId })),
  getDesignerOrArchitect: (customerId) =>
    dispatch(getDesignerOrArchitectsAPI({ customerId })),
  getSelections: (customerId) => dispatch(getSelectionsAPI({ customerId })),

  editCustomer: (customerId) => dispatch(editCustomerAPI({ customerId })),
  // editFabricator: (customerId) => dispatch(editFabricatorAPI({ customerId })),
  // editKitchenAndBath: (customerId) =>
  //   dispatch(editFabricatorAPI({ customerId })),
  // editDesidnerOrArchitect: (customerId) =>
  //   dispatch(editFabricatorAPI({ customerId })),

  editSelection: (payload) => dispatch(editSelectionAPI(payload)),
  deleteSelection: (payload) => dispatch(deleteSelectionsAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetails);
