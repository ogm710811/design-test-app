import {ReferenceValueVO, WorkSessionWorkItemVO} from '@fox/rest-clients';

export const loginTestData: object[] = [
  {
    'username': 'foxtusr1',
    'password': 'password',
    'access_token': '621b1aa1-acIf-4c3f-b265-94328c0bf31d',
    'authorities': ['OP_READ_MEMBER'],
    'firstName': 'Foxtest1',
    'lastName': 'User1',
    'teamCode': '503'
  },
  {
    'username': 'foxtusrc',
    'password': 'password',
    'access_token': '721b1aa1-acIf-4c3f-b266-94328c0bf31d',
    'authorities': ['OP_REASSIGN_MEMBER_LOOKUP'],
    'firstName': 'Foxtestc',
    'lastName': 'Userc',
    'teamCode': '333'
  },
  {
    'username': 'nsantos',
    'password': 'password',
    'access_token': '821b1aa1-acIf-4c3f-b267-94328c0bf31d',
    'authorities': [],
    'firstName': 'Nina',
    'lastName': 'Santos',
    'teamCode': ''
  },
  {
    'username': 'foxtusr6',
    'password': 'password',
    'access_token': '921b1aa1-acIf-4c3f-b268-94328c0bf31d',
    'authorities': ['OP_READ_MEMBER', 'OP_REASSIGN_MEMBER_LOOKUP', 'OP_MAINTAIN_STD_WQ', 'OP_MAINTAIN_WORKQUEUE'],
    'firstName': 'Foxtest6',
    'lastName': 'User6',
    'teamCode': '291'
  },
  {
    'username': 'foxtusr9',
    'password': 'password',
    'access_token': '92175hs1-acIf-4c3f-b268-94328c0bf31d',
    'authorities': ['OP_READ_MEMBER', 'OP_REASSIGN_MEMBER_LOOKUP', 'OP_MAINTAIN_WORKQUEUE'],
    'firstName': 'Foxtest9',
    'lastName': 'User9',
    'teamCode': '291'
  }
];

export const teamTestData: object[] = [
  {
    'code': '291',
    'name': 'Team UBER',
    'id': 0,
    'tags': ['SUPERVISORS']
  },
  {
    'code': '333',
    'name': 'Super Duper Visors',
    'id': 1,
    'tags': ['SUPERVISORS']
  },
  {
    'code': '503',
    'name': 'Members R Us',
    'id': 2,
    'tags': ['MEMBER_LOOKUP']
  }
];

export const teamTestData1: object[] = [
  {
    'code': '291',
    'name': 'Team UBER',
    'id': 0,
    'tags': ['SUPERVISORS'],
    'amount': '100'
  },
  {
    'code': '333',
    'name': 'Super Duper Visors',
    'id': 1,
    'tags': ['SUPERVISORS'],
    'amount': '200'
  },
  {
    'code': '503',
    'name': 'Members R Us',
    'id': 2,
    'tags': ['MEMBER_LOOKUP'],
    'amount': '300'
  },
  {
    'code': '666',
    'name': 'Members R Us',
    'id': 3,
    'tags': ['MEMBER_LOOKUP'],
    'amount': '400'
  },
  {
    'code': '504',
    'name': 'Members R Us',
    'id': 4,
    'tags': ['MEMBER_LOOKUP'],
    'amount': '500'
  },
  {
    'code': '515',
    'name': 'Members R Us',
    'id': 5,
    'tags': ['MEMBER_LOOKUP'],
    'amount': '600'
  },
  {
    'code': '506',
    'name': 'Members R Us',
    'id': 6,
    'tags': ['MEMBER_LOOKUP'],
    'amount': '700'
  },
  {
    'code': '589',
    'name': 'Members R Us',
    'id': 7,
    'tags': ['MEMBER_LOOKUP'],
    'amount': '800'
  }
];

export const claimsTestData: object[] = [
  {
    'memberLookupProcess': {
      'processId': 267,
      'memberLookupObject': {
        'claimTrackingId': '36418234921',
        'source': 1,
        'member': {
          'memberParty': {
            'lastName': 'Smith',
            'firstName': 'Betty',
            'middleName': '',
            'suffixName': '',
            'dateOfBirth': '1920-12-25',
            'gender': ''
          },
          'memberPartyIdentifiers': {
            'medicareClaimNumber': '',
            'aarpMembershipNumber': '',
            'memRecNo': '',
            'individualId': ''
          },
          'memberPartyAddress': {
            'addressLine1': '123 Team Resistance Drive',
            'addressLine2': '',
            'cityNameText': '',
            'stateProvinceCode': '',
            'postalCode': '',
            'countryCode': '',
            'countrySubCode': ''
          }
        }
      },
      'isSuccess': true,
      'state': 'ACTIVE',
      'startDate': '2017-10-12'
    },
    '_links': {}
  },
  {
    'memberLookupProcess': {
      'processId': 230,
      'memberLookupObject': {
        'claimTrackingId': '94139716725',
        'source': 1,
        'member': {
          'memberParty': {
            'lastName': 'Mouse',
            'firstName': 'Mickey',
            'middleName': '',
            'dateOfBirth': '1950-01-01',
            'gender': ''
          },
          'memberPartyIdentifiers': {
            'medicareClaimNumber': '',
            'aarpMembershipNumber': '',
            'mdmRecordNumber': '',
            'individualId': ''
          },
          'memberPartyAddress': {
            'addressLine1': '123 Disney Road',
            'addressLine2': '',
            'cityNameText': '',
            'stateProvinceCode': '',
            'postalCode': '',
            'countryCode': '',
            'countrySubCode': ''
          }
        }
      },
      'isSuccess': true,
      'state': 'ACTIVE',
      'startDate': '2017-10-12'
    },
    '_links': {}
  }
];

export const potentialMatchesTestData: object[] = [
  {
    '_embedded': {
      'items': [
        {
          'matchScore': 119,
          'result': {
            'memberParty': {
              'firstName': 'BETTY',
              'lastName': 'SMITH',
              'middleName': '',
              'suffixName': '',
              'dateOfBirth': '1920-12-25',
              'gender': 'U'
            },
            'memberPartyIdentifiers': {
              'medicareClaimNumber': '',
              'aarpMembershipNumber': '399528598',
              'mdmRecordNumber': '8749414',
              'individualId': '6300012695463'
            },
            'memberPartyAddress': [
              {
                'addressType': 'PERMADR',
                'addressLine1': '123 TEAM RESISTANCE DR',
                'addressLine2': '',
                'cityNameText': 'GALAXY',
                'stateProvinceCode': 'AZ',
                'postalCode': '12345',
                'countryCode': 'US'
              },
              {
                'addressType': 'TEMPADR',
                'addressLine1': '7 DQAR AVE',
                'addressLine2': 'APT 3',
                'cityNameText': 'GALAXY',
                'stateProvinceCode': 'AZ',
                'postalCode': '12345',
                'countryCode': 'US'
              }
            ],
            'memberPolicies': []
          },
          '_links': {
            'self': {
              'href': 'http://mdm-mediator-fox-int.ose-elr-core.optum.com/api/member/claim/8749414'
            }
          }
        },
        {
          'matchScore': 108,
          'result': {
            'memberParty': {
              'firstName': 'BETTY',
              'lastName': 'SMITH',
              'middleName': '',
              'suffixName': '',
              'dateOfBirth': '1920-12-25',
              'gender': 'U'
            },
            'memberPartyIdentifiers': {
              'medicareClaimNumber': '',
              'aarpMembershipNumber': '399528600',
              'mdmRecordNumber': '11070519',
              'individualId': '8000011367380'
            },
            'memberPartyAddress': [
              {
                'addressType': 'PERMADR',
                'addressLine1': '123 TEAM EMPIRE RD',
                'addressLine2': '',
                'cityNameText': 'STAR WARS',
                'stateProvinceCode': 'IL',
                'postalCode': '23456',
                'countryCode': 'US'
              }
            ],
            'memberPolicies': []
          },
          '_links': {
            'self': {
              'href': 'http://mdm-mediator-fox-int.ose-elr-core.optum.com/api/member/claim/11070519'
            }
          }
        },
        {
          'matchScore': 108,
          'result': {
            'memberParty': {
              'firstName': 'BETTY',
              'lastName': 'SMITH',
              'middleName': '',
              'suffixName': '',
              'dateOfBirth': '1920-12-25',
              'gender': 'U'
            },
            'memberPartyIdentifiers': {
              'medicareClaimNumber': '100450066A',
              'aarpMembershipNumber': '399528599',
              'mdmRecordNumber': '11070519',
              'individualId': '8000011367380'
            },
            'memberPartyAddress': [
              {
                'addressType': 'TEMPADR',
                'addressLine1': '123 TEAM EMPIRE RD',
                'addressLine2': '',
                'cityNameText': 'STAR WARS',
                'stateProvinceCode': 'IL',
                'postalCode': '23456',
                'countryCode': 'US'
              }
            ],
            'memberPolicies': []
          },
          '_links': {
            'self': {
              'href': 'http://mdm-mediator-fox-int.ose-elr-core.optum.com/api/member/claim/11070519'
            }
          }
        }
      ]
    },
    '_links': {
      'self': {
        'href': 'http://mdm-mediator-fox-int.ose-elr-core.optum.com/api/member' +
          '?firstName=Sally&lastName=Lewis&stLine1=6577%20DA%20LISA%20RD&gender=F' +
          '&mbrNumber=303646861&page=0&size=2&sort=mdmRecordNumber,asc'
      }
    },
    'page': {
      'size': 2,
      'totalElements': 2,
      'totalPages': 1,
      'number': 0
    }
  },
  {
    '_embedded': {
      'items': [
        {
          'matchScore': 131,
          'result': {
            'memberParty': {
              'firstName': 'MICKEY',
              'lastName': 'MOUSE',
              'middleName': '',
              'suffixName': '',
              'dateOfBirth': '1950-01-01',
              'gender': 'U'
            },
            'memberPartyIdentifiers': {
              'medicareClaimNumber': '100450066A',
              'aarpMembershipNumber': '399528619',
              'mdmRecordNumber': '1989429',
              'individualId': '1400011421914'
            },
            'memberPartyAddress': [
              {
                'addressLine1': '123 DISNEY WAY',
                'addressLine2': '',
                'cityNameText': 'ORLANDO',
                'stateProvinceCode': 'FL',
                'postalCode': '32003',
                'countryCode': 'US'
              }
            ],
            'memberPolicies': []
          },
          '_links': {
            'self': {
              'href': 'http://mdm-mediator-fox-int.ose-elr-core.optum.com/api/member/claim/1989429'
            }
          }
        }
      ]
    },
    '_links': {
      'self': {
        'href': 'http://mdm-mediator-fox-int.ose-elr-core.optum.com/api/member' +
          '?firstName=Robert&lastName=Mason&stLine1=2112%20WOOD%20AVE&gender=M' +
          '&mbrNumber=93383961&page=0&size=3&sort=mdmRecordNumber,asc'
      }
    },
    'page': {
      'size': 1,
      'totalElements': 1,
      'totalPages': 1,
      'number': 0
    }
  }

];

export const previousClaimTestData: object[] = [
  {
    'taskId': 230,
    'claimTrackingId': '2476EA396942'
  }
];

export const depositDetails = [
  {
    'depositDetailId': 26800,
    'depositCheckClaimId': 72586225487,
    'checkId': 231,
    'depositAmount': '3720.01',
    'depositDate': '2018-02-01',
    'depositStatus': 'PENDING',
    'depositSource': 'CLEARINGHOUSE',
    'docControlId': 7254448
  },
  {

    'depositDetailId': 26801,
    'depositCheckClaimId': 72586225487,
    'checkId': 103,
    'depositAmount': '6550.67',
    'depositDate': '2017-07-21',
    'depositStatus': 'PENDING',
    'depositSource': 'CLEARINGHOUSE',
    'docControlId': 5673903
  },
  {

    'depositDetailId': 26802,
    'depositCheckClaimId': 72586213467,
    'checkId': 103,
    'depositAmount': '24716.80',
    'depositDate': '2017-07-21',
    'depositStatus': 'PENDING',
    'depositSource': 'CLEARINGHOUSE',
    'docControlId': 5673903
  },
  {

    'depositDetailId': 26855,
    'depositCheckClaimId': 38765209002,
    'checkId': 103,
    'depositAmount': '24716.80',
    'depositDate': '2017-07-21',
    'depositStatus': 'PENDING',
    'depositSource': 'CLEARINGHOUSE',
    'docControlId': 5673934
  },
  {

    'depositDetailId': 26886,
    'depositCheckClaimId': 84309225487,
    'checkId': 99,
    'depositAmount': '3720.01',
    'depositDate': '2018-04-15',
    'depositStatus': 'PENDING',
    'depositSource': 'CLEARINGHOUSE',
    'docControlId': 5673992
  }
];

export const iconLinkSrc = [
  {
    'Member': 39917834623,
    'Medicare #': 26801,
    'Last Name': 'PARKER',
    'First Name': 'RICHARD',
    'Middle Name': 'ALEX',
    'Date of Birth': '2018-05-10',
    'Status': ['confirm-green.svg', 'Active']
  },
  {
    'Member': 39917834623,
    'Medicare #': 26802,
    'Last Name': 'PARKER',
    'First Name': 'RICHARD',
    'Middle Name': 'ALEX',
    'Date of Birth': '2018-05-10',
    'Status': ['confirm-green.svg', 'Active']
  },
  {
    'Member': 39917834623,
    'Medicare #': 26802,
    'Last Name': 'PARKER',
    'First Name': 'RICHARD',
    'Middle Name': 'ALEX',
    'Date of Birth': '2018-05-10',
    'Status': ['deny-red.svg', 'Inactive']
  },
  {
    'Member': 39917834623,
    'Medicare #': 26855,
    'Last Name': 'PARKER',
    'First Name': 'RICHARD',
    'Middle Name': 'ALEX',
    'Date of Birth': '2018-05-10',
    'Status': ['confirm-green.svg', 'Active']
  },
  {
    'Member': 39917834623,
    'Medicare #': 26855,
    'Last Name': 'PARKER',
    'First Name': 'RICHARD',
    'Middle Name': 'ALEX',
    'Date of Birth': '2018-05-10',
    'Status': ['deny-red.svg', 'Inactive']
  },
  {
    'Member': 39917834623,
    'Medicare #': 26886,
    'Last Name': 'PARKER',
    'First Name': 'RICHARD',
    'Middle Name': 'ALEX',
    'Date of Birth': '2018-05-10',
    'Status': ['confirm-green.svg', 'Active']
  },
  {
    'Member': 39917834623,
    'Medicare #': 26886,
    'Last Name': 'PARKER',
    'First Name': 'RICHARD',
    'Middle Name': 'ALEX',
    'Date of Birth': '2018-05-10',
    'Status': ['confirm-green.svg', 'Active']
  },
  {
    'Member': 39917834623,
    'Medicare #': 26886,
    'Last Name': 'PARKER',
    'First Name': 'RICHARD',
    'Middle Name': 'ALEX',
    'Date of Birth': '2018-05-10',
    'Status': ['deny-red.svg', 'Inactive']
  }
];

export const trcs = [
  {
    'treasuryReconciliationId': 421,
    'depositDetailId': 26801,
    'treasuryReconciliationAmount': 12.75,
    'treasuryReconciliationStatus': 'PENDING',
    'treasuryReconciliationCategory': 'CAT1',
    'dateCreated': '2018-05-10',
    'createdBy': 'VPANCHEL',
    'claimId': 614230123672,
    'depositCheckClaimId': 1234567890,
    'businessUnit': 'FINANCE'
  },
  {
    'treasuryReconciliationId': 422,
    'depositDetailId': 26802,
    'treasuryReconciliationAmount': 117.16,
    'treasuryReconciliationStatus': 'PENDING',
    'treasuryReconciliationCategory': 'CAT1',
    'dateCreated': '2018-05-10',
    'createdBy': 'CANDREWS',
    'claimId': 614476000000,
    'depositCheckClaimId': 9876543210,
    'businessUnit': 'NONFINANCE'
  },
  {
    'treasuryReconciliationId': 423,
    'depositDetailId': 26802,
    'treasuryReconciliationAmount': 117.16,
    'treasuryReconciliationStatus': 'PENDING',
    'treasuryReconciliationCategory': 'CAT1',
    'dateCreated': '2018-05-10',
    'createdBy': 'BCHERRY',
    'claimId': 614476000000,
    'depositCheckClaimId': 1011121314,
    'businessUnit': 'FINANCE'
  },
  {
    'treasuryReconciliationId': 424,
    'depositDetailId': 26855,
    'treasuryReconciliationAmount': 12358.40,
    'treasuryReconciliationStatus': 'COMPLETED',
    'treasuryReconciliationCategory': 'CAT1',
    'dateCreated': '2018-05-10',
    'createdBy': 'VPANCHEL',
    'claimId': 614476000000,
    'depositCheckClaimId': 4131211101,
    'businessUnit': 'NONFINANCE'
  },
  {
    'treasuryReconciliationId': 425,
    'depositDetailId': 26855,
    'treasuryReconciliationAmount': 12358.40,
    'treasuryReconciliationStatus': 'COMPLETED',
    'treasuryReconciliationCategory': 'CAT1',
    'dateCreated': '2018-05-10',
    'createdBy': 'VPANCHEL',
    'claimId': 614476000000,
    'depositCheckClaimId': 8958472565,
    'businessUnit': 'FINANCE'
  },
  {
    'treasuryReconciliationId': 426,
    'depositDetailId': 26886,
    'treasuryReconciliationAmount': 117.16,
    'treasuryReconciliationStatus': 'VOUCHERED',
    'treasuryReconciliationCategory': 'CAT1',
    'dateCreated': '2018-05-10',
    'createdBy': 'LSKYWALKER',
    'claimId': 656097200000,
    'depositCheckClaimId': 8958472565,
    'businessUnit': 'NONFINANCE'
  },
  {
    'treasuryReconciliationId': 427,
    'depositDetailId': 26886,
    'treasuryReconciliationAmount': 2592.34,
    'treasuryReconciliationStatus': 'VOUCHERED',
    'treasuryReconciliationCategory': 'CAT1',
    'dateCreated': '2018-05-10',
    'createdBy': 'UBER',
    'claimId': 614476003210,
    'depositCheckClaimId': 8958472565,
    'businessUnit': 'FINANCE'
  },
  {
    'treasuryReconciliationId': 428,
    'depositDetailId': 26886,
    'treasuryReconciliationAmount': 1010.51,
    'treasuryReconciliationStatus': 'VOUCHERED',
    'treasuryReconciliationCategory': 'CAT1',
    'dateCreated': '2018-05-10',
    'createdBy': 'SWHITE',
    'claimId': 614476055550,
    'depositCheckClaimId': 8958472565,
    'businessUnit': 'NONFINANCE'
  }
];

export const trcsInput = [
  {
    'dropDownOption': {key: 'key 1', value: 'value 1', label: 'Option 1'},
    'treasuryReconciliationId': 421,
    'depositDetailId': 26801,
    'treasuryReconciliationAmount': 12.75,
    'treasuryReconciliationStatus': 'PENDING',
    'treasuryReconciliationCategory': 'CAT1',
    'dateCreated': '2018-05-10',
    'createdBy': 'VPANCHEL',
    'claimId': 614230123672,
    'depositCheckClaimId': 1234567890,
    'businessUnit': 'FINANCE'
  },
  {
    'dropDownOption': {key: 'key 1', value: 'value 1', label: 'Option 1'},
    'treasuryReconciliationId': 422,
    'depositDetailId': 26802,
    'treasuryReconciliationAmount': 117.16,
    'treasuryReconciliationStatus': 'PENDING',
    'treasuryReconciliationCategory': 'CAT1',
    'dateCreated': '2018-05-10',
    'createdBy': 'CANDREWS',
    'claimId': 614476000000,
    'depositCheckClaimId': 9876543210,
    'businessUnit': 'NONFINANCE'
  },
  {
    'dropDownOption': {key: 'key 1', value: 'value 1', label: 'Option 1'},
    'treasuryReconciliationId': 423,
    'depositDetailId': 26802,
    'treasuryReconciliationAmount': 117.16,
    'treasuryReconciliationStatus': 'PENDING',
    'treasuryReconciliationCategory': 'CAT1',
    'dateCreated': '2018-05-10',
    'createdBy': 'BCHERRY',
    'claimId': 614476000000,
    'depositCheckClaimId': 1011121314,
    'businessUnit': 'FINANCE'
  },
  {
    'dropDownOption': {key: 'key 1', value: 'value 1', label: 'Option 1'},
    'treasuryReconciliationId': 424,
    'depositDetailId': 26855,
    'treasuryReconciliationAmount': 12358.40,
    'treasuryReconciliationStatus': 'COMPLETED',
    'treasuryReconciliationCategory': 'CAT1',
    'dateCreated': '2018-05-10',
    'createdBy': 'VPANCHEL',
    'claimId': 614476000000,
    'depositCheckClaimId': 4131211101,
    'businessUnit': 'NONFINANCE'
  },
  {
    'dropDownOption': {key: 'key 1', value: 'value 1', label: 'Option 1'},
    'treasuryReconciliationId': 425,
    'depositDetailId': 26855,
    'treasuryReconciliationAmount': 12358.40,
    'treasuryReconciliationStatus': 'COMPLETED',
    'treasuryReconciliationCategory': 'CAT1',
    'dateCreated': '2018-05-10',
    'createdBy': 'VPANCHEL',
    'claimId': 614476000000,
    'depositCheckClaimId': 8958472565,
    'businessUnit': 'FINANCE'
  },
  {
    'dropDownOption': {key: 'key 1', value: 'value 1', label: 'Option 1'},
    'treasuryReconciliationId': 426,
    'depositDetailId': 26886,
    'treasuryReconciliationAmount': 117.16,
    'treasuryReconciliationStatus': 'VOUCHERED',
    'treasuryReconciliationCategory': 'CAT1',
    'dateCreated': '2018-05-10',
    'createdBy': 'LSKYWALKER',
    'claimId': 656097200000,
    'depositCheckClaimId': 8958472565,
    'businessUnit': 'NONFINANCE'
  },
  {
    'dropDownOption': {key: 'key 1', value: 'value 1', label: 'Option 1'},
    'treasuryReconciliationId': 427,
    'depositDetailId': 26886,
    'treasuryReconciliationAmount': 2592.34,
    'treasuryReconciliationStatus': 'VOUCHERED',
    'treasuryReconciliationCategory': 'CAT1',
    'dateCreated': '2018-05-10',
    'createdBy': 'UBER',
    'claimId': 614476003210,
    'depositCheckClaimId': 8958472565,
    'businessUnit': 'FINANCE'
  },
  {
    'dropDownOption': {key: 'key 1', value: 'value 1', label: 'Option 1'},
    'treasuryReconciliationId': 428,
    'depositDetailId': 26886,
    'treasuryReconciliationAmount': 1010.51,
    'treasuryReconciliationStatus': 'VOUCHERED',
    'treasuryReconciliationCategory': 'CAT1',
    'dateCreated': '2018-05-10',
    'createdBy': 'SWHITE',
    'claimId': 614476055550,
    'depositCheckClaimId': 8958472565,
    'businessUnit': 'NONFINANCE'
  }
];

export const hospitalData = [
  {
    'prn': '191temple',
    'prt': 'h',
    'srf': '010118',
    'srt': '123104',
    'validateFromDate': '2018-01-01',
    'validateToDate': '0105',
    'srd': '004',
    'pre': '',
    'ifr': '',
    'ito': '',
    'ida': '',
    'dos': ''
  },
  {
    'prn': '191temple',
    'prt': 'h',
    'srf': '010118',
    'srt': '123104',
    'validateFromDate': '2018-01-01',
    'validateToDate': '0105',
    'srd': '004',
    'pre': '',
    'ifr': '',
    'ito': '',
    'ida': '',
    'dos': ''
  }
 ];

export const workTypeRefValues: ReferenceValueVO[] = [
  {
    'id': 1,
    'description': 'Paper-Non-Claims',
    'activeFlag': 'Y'
  },
  {
    'id': 2,
    'description': 'Paper-Claims',
    'activeFlag': 'Y'
  }
];

export const workSessionValues: WorkSessionWorkItemVO = {
    sessionId : 431,
    userId : 'foxtusr6',
    workQueueItem : {
      wqiId : 1785,
      reason : 'suKI9mMNJUyW8PaBhZuj',
      wqiBusinessId : '0489851612459838614508',
      businessIdType : 13,
      queue : 'N15',
      assignedBy : 'eLl8i2CM2DQD',
      urgency : 10,
      processId : 263812
    }
  };

export const categoryRefValues: ReferenceValueVO[] = [
  {
    'id': 1,
    'description': 'Correspondence',
    'activeFlag': 'Y'
  }
];

export const urgencyRefValues: ReferenceValueVO[] = [
  {
    'id': 1,
    'description': 'Normal',
    'activeFlag': 'Y'
  },
  {
    'id': 2,
    'description': 'High',
    'activeFlag': 'Y'
  }
];

export const dupe_resp  = {
  items: [
    {
      dupIndicator: 'POSSIBLE',
      chargeLineKey: '1234567890',
      chargeLineType: '1234567890',
      incomingChargeLine: [
        {
          duplicateBillLine: '00000000000',
          historicalClaimNum: '00000000000',
          ICN_VC289: 'VC0000',
          DateOfServiceFrom: '01/01/2018',
          DateOfServiceTo: '01/02/2019',
          BilledAmount: '40',
          CoinsuranceAmount: '15',
          DeductibleAmount: '0.01',
          CPTCode: '992100',
          Modifier1: '00000000000',
          Modifier2: '00000000000',
          Modifier3: '00000000000',
          Modifier4: '00000000000',
          Duplicates: '-'
        },
        {
          duplicateBillLine: '11111111111',
          historicalClaimNum: '11111111111',
          ICN_VC289: 'VC1111',
          DateOfServiceFrom: '01/01/2018',
          DateOfServiceTo: '01/02/2019',
          BilledAmount: '50',
          CoinsuranceAmount: '25',
          DeductibleAmount: '0.02',
          CPTCode: '992111',
          Modifier1: '11111111111',
          Modifier2: '11111111111',
          Modifier3: '11111111111',
          Modifier4: '11111111111',
          Duplicates: '-'
        },
        {
          duplicateBillLine: '22222222222',
          historicalClaimNum: '22222222222',
          ICN_VC289: 'VC22222',
          DateOfServiceFrom: '01/01/2018',
          DateOfServiceTo: '01/02/2019',
          BilledAmount: '60',
          CoinsuranceAmount: '35',
          DeductibleAmount: '0.03',
          CPTCode: '9922222',
          Modifier1: '22222222222',
          Modifier2: '22222222222',
          Modifier3: '22222222222',
          Modifier4: '22222222222',
          Duplicates: '-'
        }
      ],
      duplicateBillLines: [
        {
          duplicateBillLine: '1234567890',
          historicalClaimNum: '1234567890',
          ICN_VC289: 'VC289',
          DateOfServiceFrom: '01/01/2018',
          DateOfServiceTo: '01/02/2019',
          BilledAmount: '50',
          CoinsuranceAmount: '25',
          DeductibleAmount: '0.00',
          CPTCode: '99213',
          Modifier1: '1234567890',
          Modifier2: '1234567890',
          Modifier3: '1234567890',
          Modifier4: '1234567890',
          Duplicate: 'Yes'
        },
        {
          duplicateBillLine: '12345678902',
          historicalClaimNum: '12345678902',
          ICN_VC289: 'VC2892',
          DateOfServiceFrom: '02/02/2018',
          DateOfServiceTo: '02/03/2019',
          BilledAmount: '60',
          CoinsuranceAmount: '75',
          DeductibleAmount: '1.00',
          CPTCode: '9921300',
          Modifier1: '12345678902',
          Modifier2: '12345678902',
          Modifier3: '12345678902',
          Modifier4: '12345678902',
          Duplicate: 'Yes'
        },
        {
          duplicateBillLine: '12345678902',
          historicalClaimNum: '12345678902',
          ICN_VC289: 'VC2892',
          DateOfServiceFrom: '02/02/2018',
          DateOfServiceTo: '02/03/2019',
          BilledAmount: '60',
          CoinsuranceAmount: '75',
          DeductibleAmount: '1.00',
          CPTCode: '9921300',
          Modifier1: '12345678902',
          Modifier2: '12345678902',
          Modifier3: '12345678902',
          Modifier4: '12345678902',
          Duplicate: 'No'
        },
        {
          duplicateBillLine: '12345678902',
          historicalClaimNum: '12345678902',
          ICN_VC289: 'VC2892',
          DateOfServiceFrom: '02/02/2018',
          DateOfServiceTo: '02/03/2019',
          BilledAmount: '60',
          CoinsuranceAmount: '75',
          DeductibleAmount: '1.00',
          CPTCode: '9921300',
          Modifier1: '12345678902',
          Modifier2: '12345678902',
          Modifier3: '12345678902',
          Modifier4: '12345678902',
          Duplicate: 'Yes'
        },
        {
          duplicateBillLine: '12345678902',
          historicalClaimNum: '12345678902',
          ICN_VC289: 'VC2892',
          DateOfServiceFrom: '02/02/2018',
          DateOfServiceTo: '02/03/2019',
          BilledAmount: '60',
          CoinsuranceAmount: '75',
          DeductibleAmount: '1.00',
          CPTCode: '9921300',
          Modifier1: '12345678902',
          Modifier2: '12345678902',
          Modifier3: '12345678902',
          Modifier4: '12345678902',
          Duplicate: 'No'
        },
        {
          duplicateBillLine: '12345678902',
          historicalClaimNum: '12345678902',
          ICN_VC289: 'VC2892',
          DateOfServiceFrom: '02/02/2018',
          DateOfServiceTo: '02/03/2019',
          BilledAmount: '60',
          CoinsuranceAmount: '75',
          DeductibleAmount: '1.00',
          CPTCode: '9921300',
          Modifier1: '12345678902',
          Modifier2: '12345678902',
          Modifier3: '12345678902',
          Modifier4: '12345678902',
          Duplicate: 'No'
        },
        {
          duplicateBillLine: '12345678902',
          historicalClaimNum: '12345678902',
          ICN_VC289: 'VC2892',
          DateOfServiceFrom: '02/02/2018',
          DateOfServiceTo: '02/03/2019',
          BilledAmount: '60',
          CoinsuranceAmount: '75',
          DeductibleAmount: '1.00',
          CPTCode: '9921300',
          Modifier1: '12345678902',
          Modifier2: '12345678902',
          Modifier3: '12345678902',
          Modifier4: '12345678902',
          Duplicate: 'Yes'
        },
        {
          duplicateBillLine: '12345678902',
          historicalClaimNum: '12345678902',
          ICN_VC289: 'VC2892',
          DateOfServiceFrom: '02/02/2018',
          DateOfServiceTo: '02/03/2019',
          BilledAmount: '60',
          CoinsuranceAmount: '75',
          DeductibleAmount: '1.00',
          CPTCode: '9921300',
          Modifier1: '12345678902',
          Modifier2: '12345678902',
          Modifier3: '12345678902',
          Modifier4: '12345678902',
          Duplicate: 'No'
        }
      ]
    }
  ]
};

export const dropDownOptions: any[] = [
  {
    key: 'key 1',
    value: 'value 1',
    label: 'Option 1'
  },
  {
    key: 'key 2',
    value: 'value 2',
    label: 'Option 2'
  }
];

export const billLineTableData = [
  {
    '#': 1,
    'Special Demo': 'TextArea1',
    'Plan': 'A01',
    'Provider': 'UC San Diego Health1',
    'DOS From': '01/01/2018',
    'Charge': 1000.22,
    'CPT Code': 93201,
    'No Pay': '-',
    'Pattern Paragraph': 93201
  },
  {
    '#': 2,
    'Special Demo': 'TextArea2',
    'Plan': 'A02',
    'Provider': 'UC San Diego Health2',
    'DOS From': '01/01/2019',
    'Charge': 1002.22,
    'CPT Code': 93202,
    'No Pay': '-',
    'Pattern Paragraph': 93202
  },
  {
    '#': 3,
    'Special Demo': 'TextArea3',
    'Plan': 'A03',
    'Provider': 'UC San Diego Health3',
    'DOS From': '01/01/2017',
    'Charge': 1003.22,
    'CPT Code': 93203,
    'No Pay': '-',
    'Pattern Paragraph': 93203
  },
  {
    '#': 4,
    'Special Demo': 'TextArea4',
    'Plan': 'A04',
    'Provider': 'UC San Diego Health4',
    'DOS From': '01/01/2016',
    'Charge': 1004.22,
    'CPT Code': 93204,
    'No Pay': '-',
    'Pattern Paragraph': 93204
  },
  {
    '#': 5,
    'Special Demo': 'TextArea5',
    'Plan': 'A05',
    'Provider': 'UC San Diego Health5',
    'DOS From': '01/01/2015',
    'Charge': 1005.22,
    'CPT Code': 93205,
    'No Pay': '-',
    'Pattern Paragraph': 93205
  }
];
