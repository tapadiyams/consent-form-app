import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  deleteSelectionsAPI,
  getCustomersListAPI,
  getDesignerOrArchitectsAPI,
  getFabricatorsAPI,
  getKitchenAndBathsAPI,
  getSelectionsAPI,
} from "../actions";
import { useTranslation } from "react-i18next";

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
  deleteSelection,
}) => {
  /**
   *
   * Define states and constants
   *
   */
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

  // const handleEditSelection = () => {};

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
      {/* <BackgroundImage src="/images/granite-countertop-1080x600.jpg" alt="" /> */}
      <Data>
        <Header>
          <h2>CUSTOMER SELECTIONS</h2>
          <PrintButton onClick={handlePrint}>Print</PrintButton>
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
        </Table>

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
              <TableHeader>#</TableHeader>
              <TableHeader>CATEGORIES</TableHeader>
              <TableHeader>MATERIALS</TableHeader>
              <TableHeader>SIZE</TableHeader>
              <TableHeader>THICKNESS</TableHeader>
              <TableHeader>NOTES</TableHeader>
              {/* <TableHeader>EDITS</TableHeader> */}
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
                    {selection.note}
                  </TableCell>
                  {/* <TableCell rowNumber={rowNumber} isEvenRow={isEvenRow}>
                    <button onClick={handleEditSelection}>EDIT</button>
                  </TableCell> */}
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

// const BackgroundImage = styled.img`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   opacity: 0.02;
//   object-fit: cover;
// `;

const Data = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`;

const Header = styled.div`
  display: flex;

  h2 {
    font-size: xx-large;
    align-items: center;
  }
`;

const PrintButton = styled.button`
  background-color: green;
  color: white;
  padding: 10px 30px;
  border: none;
  border-radius: 4px;
  margin-bottom: 20px;
  margin-left: 10px;
  z-index: 1;
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

  deleteSelection: (payload) => dispatch(deleteSelectionsAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetails);
