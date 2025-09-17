// App.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type EyePrescription = {
  sph: string;
  cyl: string;
  axis: string;
};

type Customer = {
  id: number;
  name: string;
  phone: string;
  date: string;
  dueDate: string;
  frame: string;
  lens: string;
  prescription: {
    rightEye: EyePrescription;
    leftEye: EyePrescription;
    add: string;
    ipd: string;
  };
  financial: {
    total: number;
    advance: number;
    balance: number;
  };
};

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data
  useEffect(() => {
    setCustomers([
      {
        id: 1378,
        name: 'Falah',
        phone: '03209540511',
        date: '13/01/2025',
        dueDate: '14/01/2025',
        frame: 'gun metal',
        lens: 'photo gray HI glass',
        prescription: {
          rightEye: { sph: '+1.50', cyl: '0.75', axis: '110' },
          leftEye: { sph: '-0.50', cyl: '-1.50', axis: '090' },
          add: '+2.50',
          ipd: '',
        },
        financial: {
          total: 3500,
          advance: 1000,
          balance: 2500,
        },
      },
    ]);
  }, []);

  const AddCustomerForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      phone: '',
      frame: '',
      lens: '',
      rightEye: { sph: '', cyl: '', axis: '' },
      leftEye: { sph: '', cyl: '', axis: '' },
      add: '',
      ipd: '',
      total: '',
      advance: '',
    });

    const handleSubmit = () => {
      if (!formData.name || !formData.phone) {
        Alert.alert('Error', 'Please fill in required fields');
        return;
      }

      const newCustomer = {
        id: Date.now(),
        name: formData.name,
        phone: formData.phone,
        date: new Date().toLocaleDateString('en-GB'),
        dueDate: new Date(Date.now() + 86400000).toLocaleDateString('en-GB'),
        frame: formData.frame,
        lens: formData.lens,
        prescription: {
          rightEye: formData.rightEye,
          leftEye: formData.leftEye,
          add: formData.add,
          ipd: formData.ipd,
        },
        financial: {
          total: parseInt(formData.total) || 0,
          advance: parseInt(formData.advance) || 0,
          balance:
            (parseInt(formData.total) || 0) - (parseInt(formData.advance) || 0),
        },
      };

      setCustomers([...customers, newCustomer]);
      setModalVisible(false);
      Alert.alert('Success', 'Customer added successfully');
    };

    return (
      <Modal visible={modalVisible} animationType="slide">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add Customer</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Icon name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Customer Name *"
              value={formData.name}
              onChangeText={text => setFormData({ ...formData, name: text })}
            />

            <TextInput
              style={styles.input}
              placeholder="Phone Number *"
              value={formData.phone}
              onChangeText={text => setFormData({ ...formData, phone: text })}
              keyboardType="phone-pad"
            />

            <TextInput
              style={styles.input}
              placeholder="Frame"
              value={formData.frame}
              onChangeText={text => setFormData({ ...formData, frame: text })}
            />

            <TextInput
              style={styles.input}
              placeholder="Lens"
              value={formData.lens}
              onChangeText={text => setFormData({ ...formData, lens: text })}
            />

            <Text style={styles.sectionTitle}>Prescription</Text>

            <View style={styles.prescriptionRow}>
              <Text style={styles.eyeLabel}>Right Eye:</Text>
              <TextInput
                style={styles.prescriptionInput}
                placeholder="SPH"
                value={formData.rightEye.sph}
                onChangeText={text =>
                  setFormData({
                    ...formData,
                    rightEye: { ...formData.rightEye, sph: text },
                  })
                }
              />
              <TextInput
                style={styles.prescriptionInput}
                placeholder="CYL"
                value={formData.rightEye.cyl}
                onChangeText={text =>
                  setFormData({
                    ...formData,
                    rightEye: { ...formData.rightEye, cyl: text },
                  })
                }
              />
              <TextInput
                style={styles.prescriptionInput}
                placeholder="AXIS"
                value={formData.rightEye.axis}
                onChangeText={text =>
                  setFormData({
                    ...formData,
                    rightEye: { ...formData.rightEye, axis: text },
                  })
                }
              />
            </View>

            <View style={styles.prescriptionRow}>
              <Text style={styles.eyeLabel}>Left Eye:</Text>
              <TextInput
                style={styles.prescriptionInput}
                placeholder="SPH"
                value={formData.leftEye.sph}
                onChangeText={text =>
                  setFormData({
                    ...formData,
                    leftEye: { ...formData.leftEye, sph: text },
                  })
                }
              />
              <TextInput
                style={styles.prescriptionInput}
                placeholder="CYL"
                value={formData.leftEye.cyl}
                onChangeText={text =>
                  setFormData({
                    ...formData,
                    leftEye: { ...formData.leftEye, cyl: text },
                  })
                }
              />
              <TextInput
                style={styles.prescriptionInput}
                placeholder="AXIS"
                value={formData.leftEye.axis}
                onChangeText={text =>
                  setFormData({
                    ...formData,
                    leftEye: { ...formData.leftEye, axis: text },
                  })
                }
              />
            </View>

            <TextInput
              style={styles.input}
              placeholder="ADD"
              value={formData.add}
              onChangeText={text => setFormData({ ...formData, add: text })}
            />

            <TextInput
              style={styles.input}
              placeholder="IPD"
              value={formData.ipd}
              onChangeText={text => setFormData({ ...formData, ipd: text })}
            />

            <Text style={styles.sectionTitle}>Financial Details</Text>

            <TextInput
              style={styles.input}
              placeholder="Total Amount"
              value={formData.total}
              onChangeText={text => setFormData({ ...formData, total: text })}
              keyboardType="numeric"
            />

            <TextInput
              style={styles.input}
              placeholder="Advance"
              value={formData.advance}
              onChangeText={text => setFormData({ ...formData, advance: text })}
              keyboardType="numeric"
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Add Customer</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    );
  };

  const CustomerReceipt = ({ customer }) => {
    if (!customer) return null;

    return (
      <View style={styles.receiptContainer}>
        <View style={styles.receiptHeader}>
          <Text style={styles.companyName}>Asaan Optics</Text>
          <Text style={styles.receiptTitle}>Customer Receipt</Text>
        </View>

        <View style={styles.customerInfo}>
          <Text style={styles.infoLabel}>Customer Information:</Text>
          <Text>Name: {customer.name}</Text>
          <Text>Phone: {customer.phone}</Text>
          <Text>S.No: {customer.id}</Text>
          <Text>Date: {customer.date}</Text>
          <Text>Due Date: {customer.dueDate}</Text>
        </View>

        <View style={styles.prescriptionDetails}>
          <Text style={styles.infoLabel}>Frame: {customer.frame}</Text>
          <Text style={styles.infoLabel}>Lens: {customer.lens}</Text>

          <Text style={styles.visionTitle}>Vision:</Text>
          <View style={styles.visionTable}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}></Text>
              <Text style={styles.tableHeaderText}>SPH</Text>
              <Text style={styles.tableHeaderText}>CYL</Text>
              <Text style={styles.tableHeaderText}>AXIS</Text>
              <Text style={styles.tableHeaderText}>VA</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Rt Eye</Text>
              <Text style={styles.tableCell}>
                {customer.prescription.rightEye.sph}
              </Text>
              <Text style={styles.tableCell}>
                {customer.prescription.rightEye.cyl}
              </Text>
              <Text style={styles.tableCell}>
                {customer.prescription.rightEye.axis}
              </Text>
              <Text style={styles.tableCell}></Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Lt Eye</Text>
              <Text style={styles.tableCell}>
                {customer.prescription.leftEye.sph}
              </Text>
              <Text style={styles.tableCell}>
                {customer.prescription.leftEye.cyl}
              </Text>
              <Text style={styles.tableCell}>
                {customer.prescription.leftEye.axis}
              </Text>
              <Text style={styles.tableCell}></Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>ADD</Text>
              <Text style={styles.tableCell}>{customer.prescription.add}</Text>
              <Text style={styles.tableCell}></Text>
              <Text style={styles.tableCell}></Text>
              <Text style={styles.tableCell}></Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>IPD</Text>
              <Text style={styles.tableCell}>{customer.prescription.ipd}</Text>
              <Text style={styles.tableCell}></Text>
              <Text style={styles.tableCell}></Text>
              <Text style={styles.tableCell}></Text>
            </View>
          </View>
        </View>

        <View style={styles.financialDetails}>
          <Text style={styles.infoLabel}>Financial Details:</Text>
          <View style={styles.financialRow}>
            <Text>Total</Text>
            <Text>{customer.financial.total} Pkr</Text>
          </View>
          <View style={styles.financialRow}>
            <Text>Advance</Text>
            <Text>{customer.financial.advance} Pkr</Text>
          </View>
          <View style={styles.financialRow}>
            <Text>Balance</Text>
            <Text>{customer.financial.balance} Pkr</Text>
          </View>
        </View>

        <View style={styles.note}>
          <Text style={styles.noteTitle}>Note:</Text>
          <Text>1. 50% Advance Required for Order Confirmation.</Text>
          <Text>2. No Refund on Completed Orders.</Text>
          <Text>3. Not Responsible for Damaged Frames or Lenses.</Text>
        </View>
      </View>
    );
  };

  const Dashboard = () => (
    <View style={styles.dashboard}>
      <View style={styles.dashboardGrid}>
        <TouchableOpacity
          style={styles.dashboardItem}
          onPress={() => setModalVisible(true)}
        >
          <Icon name="person-add" size={40} color="#fff" />
          <Text style={styles.dashboardItemText}>Add Customer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dashboardItem}
          onPress={() => setCurrentScreen('search')}
        >
          <Icon name="search" size={40} color="#fff" />
          <Text style={styles.dashboardItemText}>Search Customer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dashboardItem}
          onPress={() => setCurrentScreen('repair')}
        >
          <Icon name="build" size={40} color="#fff" />
          <Text style={styles.dashboardItemText}>Add Repairing Customer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dashboardItem}
          onPress={() => setCurrentScreen('sales')}
        >
          <Icon name="bar-chart" size={40} color="#fff" />
          <Text style={styles.dashboardItemText}>Sales</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dashboardItem}
          onPress={() => setCurrentScreen('shop')}
        >
          <Icon name="store" size={40} color="#fff" />
          <Text style={styles.dashboardItemText}>My Shop</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dashboardItem}
          onPress={() =>
            Alert.alert('Logout', 'Are you sure you want to logout?')
          }
        >
          <Icon name="logout" size={40} color="#fff" />
          <Text style={styles.dashboardItemText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const SearchScreen = () => {
    const filteredCustomers = customers.filter(
      customer =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.phone.includes(searchQuery),
    );

    return (
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or phone..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <ScrollView>
          {filteredCustomers.map(customer => (
            <TouchableOpacity
              key={customer.id}
              style={styles.customerItem}
              onPress={() => {
                setSelectedCustomer(customer);
                setCurrentScreen('receipt');
              }}
            >
              <Text style={styles.customerName}>{customer.name}</Text>
              <Text style={styles.customerPhone}>{customer.phone}</Text>
              <Text style={styles.customerBalance}>
                Balance: {customer.financial.balance} Pkr
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'search':
        return <SearchScreen />;
      case 'receipt':
        return <CustomerReceipt customer={selectedCustomer} />;
      case 'repair':
        return (
          <View style={styles.comingSoon}>
            <Text style={styles.comingSoonText}>
              Repair Management Coming Soon
            </Text>
          </View>
        );
      case 'sales':
        return (
          <View style={styles.comingSoon}>
            <Text style={styles.comingSoonText}>Sales Reports Coming Soon</Text>
          </View>
        );
      case 'shop':
        return (
          <View style={styles.comingSoon}>
            <Text style={styles.comingSoonText}>Shop Settings Coming Soon</Text>
          </View>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#8B1538" barStyle="light-content" />

      <View style={styles.header}>
        {currentScreen !== 'dashboard' && (
          <TouchableOpacity onPress={() => setCurrentScreen('dashboard')}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>Asaan Optics</Text>
      </View>

      {renderScreen()}

      <AddCustomerForm />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8B1538',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#8B1538',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 16,
  },
  dashboard: {
    flex: 1,
    padding: 16,
  },
  dashboardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dashboardItem: {
    width: '48%',
    backgroundColor: '#A91B47',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  dashboardItemText: {
    color: '#fff',
    marginTop: 8,
    textAlign: 'center',
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#8B1538',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#8B1538',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalContent: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 16,
    borderRadius: 4,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
    color: '#8B1538',
  },
  prescriptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  eyeLabel: {
    width: 80,
    fontWeight: 'bold',
  },
  prescriptionInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    marginHorizontal: 4,
    borderRadius: 4,
  },
  submitButton: {
    backgroundColor: '#8B1538',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  customerItem: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 12,
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B1538',
  },
  customerPhone: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  customerBalance: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8B1538',
  },
  receiptContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  receiptHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B1538',
  },
  receiptTitle: {
    fontSize: 16,
    color: '#666',
  },
  customerInfo: {
    marginBottom: 20,
  },
  infoLabel: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#8B1538',
  },
  prescriptionDetails: {
    marginBottom: 20,
  },
  visionTitle: {
    fontWeight: 'bold',
    marginVertical: 8,
  },
  visionTable: {
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 8,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#ddd',
    padding: 8,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
  financialDetails: {
    marginBottom: 20,
  },
  financialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  note: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  noteTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#8B1538',
  },
  comingSoon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  comingSoonText: {
    fontSize: 18,
    color: '#8B1538',
    fontWeight: 'bold',
  },
});

export default App;
