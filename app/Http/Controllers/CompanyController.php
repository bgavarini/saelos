<?php

namespace App\Http\Controllers;

use Auth;
use App\Company;
use App\Opportunity;
use App\Contact;
use App\Http\Resources\CompanyCollection;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Resources\Company as CompanyResource;

/**
 * @resource Companies
 * 
 * Interact with Companies
 */
class CompanyController extends Controller
{
    const INDEX_WITH = [
        'user',
        'contacts',
        'contacts.companies',
        'contacts.opportunities',
        'contacts.opportunities.contacts',
        'opportunities',
        'opportunities.companies',
        'opportunities.contacts',
        'opportunities.customFields',
        'opportunities.customFields.field',
        'customFields',
        'customFields.field',
        'notes',
        'notes.document',
        'notes.user',
        'tags',
    ];

    const SHOW_WITH = [
        'activities',
        'activities.details',
        'user',
        'contacts',
        'contacts.companies',
        'contacts.opportunities',
        'contacts.opportunities.contacts',
        'opportunities',
        'opportunities.companies',
        'opportunities.contacts',
        'opportunities.customFields',
        'opportunities.customFields.field',
        'customFields',
        'customFields.field',
        'notes',
        'notes.document',
        'notes.user',
        'tags',
    ];

    /**
     * Fetching a filtered Company list.
     * 
     * @return CompanyCollection
     */
    public function index(Request $request)
    {
        $companies = Company::with(static::INDEX_WITH);

        if ($searchParams = json_decode($request->get('searchParams'), true)) {
            $companies = Company::search($searchParams, $companies);
        }

        if ($modifiedSince = $request->get('modified_since')) {
            $companies->where('updated_at', '>', new Carbon($modifiedSince));
        }

        $companies->orderBy('id', 'desc');

        return new CompanyCollection($companies->paginate());
    }

    /**
     * Fetch a single Company
     * 
     * @param int $id
     * 
     * @return CompanyResource
     */
    public function show($id)
    {
        return new CompanyResource(Company::with(static::SHOW_WITH)->find($id));
    }

    /**
     * Update an existing Company
     * 
     * @param Request $request
     * @param int     $id
     * 
     * @return CompanyResource
     */
    public function update(Request $request, $id)
    {
        if ($request->input('action') == 'restore'
          && Company::onlyTrashed()->where('id', $id)->restore()) {
              $company = Company::findOrFail($id);
              return $this->show($company->id);
        }

        /** @var Company $company */
        $company = Company::findOrFail($id);
        $data = $request->all();
        $customFields = $data['custom_fields'] ?? [];
        $contacts = $data['contacts'] ?? [];
        $opportunities = $data['opportunities'] ?? [];

        $opportunityIds = [];
        foreach ($opportunities as $opportunity) {
            $opportunityIds[$opportunity['id']] = [
                'primary' => $opportunity['pivot']['primary'] ?? 0,
                'position' => $opportunity['pivot']['position'] ?? ''
            ];
        }

        $contactIds = [];
        foreach ($contacts as $contact) {
            $contactIds[$contact['id']] = [
                'primary' => $contact['pivot']['primary'] ?? 0,
                'position' => $contact['pivot']['position'] ?? ''
            ];
        }

        $company->opportunities()->sync($opportunityIds);
        $company->contacts()->sync($contactIds);
        $company->update($data);
        $company->assignCustomFields($customFields);

        return $this->show($company->id);
    }

    /**
     * Save a new Company
     * 
     * @param Request $request
     * 
     * @return CompanyResource
     */
    public function store(Request $request)
    {
        $company = Company::create($request->all());

        return $this->update($request, $company->id);
    }

    /**
     * Delete a Company
     * 
     * @param int $id
     * 
     * @return null
     */
    public function destroy($id)
    {
        Company::findOrFail($id)->delete();

        return '';
    }
}
